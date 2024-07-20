namespace Booking.Domain;

public class Convenience {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<RoomConvenience> Rooms { get; set; } = null!;
}
