using Booking.Domain.Identity;

namespace Booking.Application.Interfaces;

public interface IJwtTokenService {
	Task<string> CreateTokenAsync(User user);
}