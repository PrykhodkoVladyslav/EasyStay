namespace EasyStay.Domain;

public class HotelRentalPeriod {
	public long HotelId { get; set; }
	public Hotel Hotel { get; set; } = null!;

	public long RentalPeriodId { get; set; }
	public RentalPeriod RentalPeriod { get; set; } = null!;
}
