using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain.Constants;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Booking.WebApi.Services;

public class RegistrationService(
	IBookingDbContext context,
	UserManager<User> userManager
) : IRegistrationService {

	public async Task CreateUserAsync(User user, string? password = null, CancellationToken cancellationToken = default) {
		using var transaction = await context.BeginTransactionAsync(cancellationToken);

		try {
			IdentityResult identityResult = await CreateUserInDatabaseAsync(user, password);
			if (!identityResult.Succeeded)
				throw new IdentityException(identityResult, "User creating error");

			identityResult = await userManager.AddToRoleAsync(user, Roles.User);
			if (!identityResult.Succeeded)
				throw new IdentityException(identityResult, "Role assignment error");

			await transaction.CommitAsync(cancellationToken);
		}
		catch {
			await transaction.RollbackAsync(cancellationToken);
			throw;
		}
	}

	private async Task<IdentityResult> CreateUserInDatabaseAsync(User user, string? password) {
		if (password is null)
			return await userManager.CreateAsync(user);

		return await userManager.CreateAsync(user, password);
	}
}
