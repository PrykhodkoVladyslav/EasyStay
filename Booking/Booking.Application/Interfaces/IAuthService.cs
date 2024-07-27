using Booking.Domain.Identity;

namespace Booking.Application.Interfaces;

public interface IAuthService {
	Task CreateUserAsync(User user, string? password = null, CancellationToken cancellationToken = default);
	Task<User> GoogleSignInAsync(string credential, CancellationToken cancellationToken = default);
}
