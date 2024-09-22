using EasyStay.Application.Models.Accounts;
using EasyStay.Domain.Constants;
using EasyStay.Domain.Identity;

namespace EasyStay.Application.Interfaces;

public interface IAuthService {
	Task<User> CreateUserAsync(UserDto userDto, CreateUserType type, CancellationToken cancellationToken = default);
	Task<User> GoogleSignInAsync(string credential, CreateUserType type, CancellationToken cancellationToken = default);
}
