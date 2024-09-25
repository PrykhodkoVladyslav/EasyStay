namespace EasyStay.Domain;

public class RentalPeriod {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<HotelRentalPeriod> HotelRentalPeriods { get; set; } = null!;
}
