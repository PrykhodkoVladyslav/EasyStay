namespace Booking.Domain.Identity;

public class Realtor : User {
	public ICollection<Hotel> Hotels { get; set; } = null!;

	// ToDo: Reviews
}
