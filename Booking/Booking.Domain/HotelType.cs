namespace Booking.Domain;

public class HotelType {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<Hotel> Hotels { get; set; } = null!;
}
