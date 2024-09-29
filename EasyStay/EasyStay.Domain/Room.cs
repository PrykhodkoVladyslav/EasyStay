namespace EasyStay.Domain;

public class Room {
	public long Id { get; set; }

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public int Quantity { get; set; }

	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;

	public ICollection<RoomRentalPeriod> RoomRentalPeriods { get; set; } = null!;


}