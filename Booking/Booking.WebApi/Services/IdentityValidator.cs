using Booking.Application.Interfaces;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace Booking.WebApi.Services;

public class IdentityValidator(
	UserManager<User> userManager,
	ICurrentUserService currentUserService
) : IIdentityValidator {

	public async Task<bool> IsNewEmailAsync(string email, CancellationToken cancellationToken) =>
		await userManager.FindByEmailAsync(email) is null;

	public async Task<bool> IsNewOrCurrentEmailAsync(string email, CancellationToken cancellationToken) =>
		email == currentUserService.GetRequiredUserEmail() || await IsNewEmailAsync(email, cancellationToken);

	public async Task<bool> IsNewUserNameAsync(string userName, CancellationToken cancellationToken) =>
		await userManager.FindByNameAsync(userName) is null;
}
