using System.Security.Claims;
using Booking.Application.Interfaces;

namespace Booking.WebApi.Services;

public class CurrentUserService(
	IHttpContextAccessor httpContextAccessor
) : ICurrentUserService {

	public long GetRequiredUserId() {
		var id = httpContextAccessor.HttpContext?.User?
			.FindFirstValue(ClaimTypes.NameIdentifier);

		return string.IsNullOrEmpty(id)
			? throw new Exception("User is not authorized")
			: Convert.ToInt64(id);
	}
}