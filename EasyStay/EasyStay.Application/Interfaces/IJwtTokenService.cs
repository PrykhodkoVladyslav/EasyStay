using EasyStay.Domain.Identity;

namespace EasyStay.Application.Interfaces;

public interface IJwtTokenService {
	Task<string> CreateTokenAsync(User user);
}
