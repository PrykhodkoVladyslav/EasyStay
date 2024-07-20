using Booking.Domain.Identity;

namespace Booking.Domain;

public class RoomBooking {
	public long Id { get; set; }

	public DateTime From { get; set; }

	public DateTime To { get; set; }

	public long RoomId { get; set; }
	public Room Room { get; set; } = null!;

	public long UserId { get; set; }
	public User User { get; set; } = null!;

	public ICollection<HotelReview> Reviews { get; set; } = null!;
}
