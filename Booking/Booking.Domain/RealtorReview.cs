using Booking.Domain.Identity;

namespace Booking.Domain;

public class RealtorReview {
	public long Id { get; set; }

	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public long AuthorId;
	public Customer Author { get; set; } = null!;

	public long RealtorId { get; set; }
	public Realtor Realtor { get; set; } = null!;
}
