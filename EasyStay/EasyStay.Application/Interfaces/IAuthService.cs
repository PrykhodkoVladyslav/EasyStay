using Booking.Application.Models.Accounts;
using Booking.Domain.Constants;
using Booking.Domain.Identity;

namespace Booking.Application.Interfaces;

public interface IAuthService {
	Task<User> CreateUserAsync(UserDto userDto, CreateUserType type, CancellationToken cancellationToken = default);
	Task<User> GoogleSignInAsync(string credential, CreateUserType type, CancellationToken cancellationToken = default);
}
