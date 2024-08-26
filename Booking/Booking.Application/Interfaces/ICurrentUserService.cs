namespace Booking.Application.Interfaces;

public interface ICurrentUserService {
	long GetRequiredUserId();
	string GetRequiredUserEmail();
}
