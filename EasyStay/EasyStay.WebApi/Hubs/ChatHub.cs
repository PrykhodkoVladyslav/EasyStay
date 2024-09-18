using Booking.Application.Interfaces;
using Booking.Domain;
using Booking.Domain.Constants;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Booking.WebApi.Hubs;

[Authorize(Roles = "Customer,Realtor")]
public class ChatHub(
	IBookingDbContext context,
	UserManager<User> userManager
) : Hub {
	private static class Methods {
		public const string CreateChat = "CreateChat";
		public const string ReceiveMessage = "ReceiveMessage";
	}

	public async Task SendMessage(long receiverId, string message, string requestId) {
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

		if (chat is null) {
			chat = new Chat {
				CustomerId = customerId,
				RealtorId = realtorId,
				Messages = []
			};

			await context.Chats.AddAsync(chat);

			await context.SaveChangesAsync(CancellationToken.None);
			await Clients.User(receiverId.ToString()).SendAsync(Methods.CreateChat, chat.Id);
		}

		var messageEntity = new Message {
			Text = message,
			AuthorId = sender.Id,
			CreatedAtUtc = DateTime.UtcNow
		};

		chat.Messages.Add(messageEntity);

		await context.SaveChangesAsync(CancellationToken.None);

		await Clients
			.Users(sender.Id.ToString(), receiver.Id.ToString())
			.SendAsync(Methods.ReceiveMessage, chat.Id, message, requestId);
	}

	private async Task<User> GetUserAsync() {
		var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);

		if (string.IsNullOrEmpty(userId))
			throw new HubException("Unauthorized user.");

		var user = await userManager.FindByIdAsync(userId)
			?? throw new HubException("User not found.");

		//await userManager.GetRolesAsync(user);

		return user;
	}

	private async Task<User> GetUserOfTypeAsync<T>(long id) where T : User {
		var user = await userManager.Users
			.OfType<T>()
			.FirstOrDefaultAsync(u => u.Id == id)
			?? throw new HubException("User not found.");

		return user;
	}
}
