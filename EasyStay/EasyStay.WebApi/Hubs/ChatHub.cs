using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Chats.Queries.Shared;
using EasyStay.Domain;
using EasyStay.Domain.Constants;
using EasyStay.Domain.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace EasyStay.WebApi.Hubs;

[Authorize(Roles = "Customer,Realtor")]
public class ChatHub(
	IEasyStayDbContext context,
	UserManager<User> userManager,
	IMapper mapper
) : Hub {
	private static class Methods {
		public const string CreateChat = "CreateChat";
		public const string ReceiveMessage = "ReceiveMessage";
	}

	public async Task SendMessage(long receiverId, string message) {
		var sender = await GetUserAsync();
		var receiver = await ((await userManager.IsInRoleAsync(sender, Roles.Customer))
			? GetUserOfTypeAsync<Realtor>(receiverId)
			: GetUserOfTypeAsync<Customer>(receiverId));

		if (sender.Id == receiver.Id)
			throw new HubException("Invalid receiverId.");

		long customerId = sender.Id;
		long realtorId = receiver.Id;
		if (!await userManager.IsInRoleAsync(sender, Roles.Customer))
			(customerId, realtorId) = (realtorId, customerId);

		var chat = await context.Chats
			.FirstOrDefaultAsync(c => c.CustomerId == customerId && c.RealtorId == realtorId);

		var isNewChat = chat is null;

		if (isNewChat) {
			chat = new Chat {
				CustomerId = customerId,
				RealtorId = realtorId,
				Messages = []
			};

			await context.Chats.AddAsync(chat);

			await context.SaveChangesAsync(CancellationToken.None);
		}

		var messageEntity = new Message {
			Text = message,
			AuthorId = sender.Id,
			CreatedAtUtc = DateTime.UtcNow
		};

		chat!.Messages.Add(messageEntity);

		await context.SaveChangesAsync(CancellationToken.None);

		if (isNewChat) {
			await Clients
				.User(receiverId.ToString())
				.SendAsync(Methods.CreateChat, mapper.Map<ChatVm>(chat));
		}

		await Clients
			.Users(sender.Id.ToString(), receiver.Id.ToString())
			.SendAsync(Methods.ReceiveMessage, chat.Id, message);
	}

	private string UserId => Context.User?.FindFirstValue(ClaimTypes.NameIdentifier)
		?? throw new HubException("Unauthorized user.");

	private async Task<User> GetUserAsync() => await userManager.FindByIdAsync(UserId)
		?? throw new HubException("User not found.");

	private async Task<User> GetUserOfTypeAsync<T>(long id) where T : User =>
		await userManager.Users
			.OfType<T>()
			.FirstOrDefaultAsync(u => u.Id == id)
			?? throw new HubException("User not found.");
}
