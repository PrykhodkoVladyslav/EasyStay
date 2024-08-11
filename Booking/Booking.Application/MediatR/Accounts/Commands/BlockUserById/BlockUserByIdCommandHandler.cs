using Booking.Application.Common.Exceptions;
using Booking.Domain.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.MediatR.Accounts.Commands.BlockUserById;

public class BlockUserByIdCommandHandler(
	UserManager<User> userManager
) : IRequestHandler<BlockUserByIdCommand> {

	public async Task Handle(BlockUserByIdCommand request, CancellationToken cancellationToken) {
		var user = await userManager.FindByIdAsync(request.Id.ToString())
			?? throw new NotFoundException(nameof(User), request.Id);

		user.LockoutEnd = DateTime.SpecifyKind(request.LockoutEndUtc, DateTimeKind.Utc);

		var result = await userManager.UpdateAsync(user);

		if (!result.Succeeded)
			throw new IdentityException(result);
	}
}
