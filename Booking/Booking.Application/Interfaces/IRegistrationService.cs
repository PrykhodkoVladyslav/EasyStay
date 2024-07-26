using Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;
using Booking.Domain.Identity;

namespace Booking.Application.Interfaces;

public interface IRegistrationService {
	Task CreateUserAsync(User user, string? password = null, CancellationToken cancellationToken = default);
	Task<User> GoogleSignInAsync(GoogleSignInCommand command);
}
