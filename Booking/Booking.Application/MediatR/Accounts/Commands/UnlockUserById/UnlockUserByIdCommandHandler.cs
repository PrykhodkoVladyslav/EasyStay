using Booking.Application.Common.Exceptions;
using Booking.Domain.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Booking.Application.MediatR.Accounts.Commands.UnlockUserById;

public class UnlockUserByIdCommandHandler(
	UserManager<User> userManager
) : IRequestHandler<UnlockUserByIdCommand> {

	public async Task Handle(UnlockUserByIdCommand request, CancellationToken cancellationToken) {
		var user = await userManager.FindByIdAsync(request.Id.ToString())
			?? throw new NotFoundException(nameof(User), request.Id);

		user.LockoutEnd = null;

		var result = await userManager.UpdateAsync(user);

		if (!result.Succeeded)
			throw new IdentityException(result);
	}
}
