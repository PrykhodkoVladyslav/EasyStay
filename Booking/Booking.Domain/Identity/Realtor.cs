namespace Booking.Domain.Identity;

public class Realtor : User {
	public ICollection<Hotel> Hotels { get; set; } = null!;

	public ICollection<RealtorReview> Reviews { get; set; } = null!;
}
