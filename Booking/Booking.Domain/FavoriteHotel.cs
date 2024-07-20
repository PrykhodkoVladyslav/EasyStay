using Booking.Domain.Identity;

namespace Booking.Domain;

public class FavoriteHotel {
	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;

	public long UserId { get; set; }
	public User User { get; set; } = null!;
}