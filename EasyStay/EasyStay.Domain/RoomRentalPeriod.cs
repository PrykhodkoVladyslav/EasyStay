namespace EasyStay.Domain;

public class RoomRentalPeriod {
	public long RoomId { get; set; }
	public Room Room { get; set; } = null!;

	public long RentalPeriodId { get; set; }
	public RentalPeriod RentalPeriod { get; set; } = null!;
}
