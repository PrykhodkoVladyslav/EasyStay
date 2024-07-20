using Booking.Domain.Identity;

namespace Booking.Domain;

public class HotelReview {
	public long Id { get; set; }

	public string Description { get; set; } = null!;

	public double? Score { get; set; }

	public long UserId { get; set; }
	public User User { get; set; } = null!;

	public long BookingId { get; set; }
	public RoomBooking Booking { get; set; } = null!;

	public ICollection<HotelReviewPhoto> Photos { get; set; } = null!;
}
