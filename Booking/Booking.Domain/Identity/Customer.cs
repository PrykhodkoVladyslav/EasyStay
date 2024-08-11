namespace Booking.Domain.Identity;

public class Customer : User {
	public ICollection<RealtorReview> RealtorReviews { get; set; } = null!;
}
