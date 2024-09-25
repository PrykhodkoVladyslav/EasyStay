namespace EasyStay.Domain;

public class RentalPeriod {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<Hotel> Hotel { get; set; } = null!;
}
