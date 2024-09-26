namespace EasyStay.Domain;

public class HotelAmenity {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public ICollection<HotelHotelAmenity> HotelHotelAmenities { get; set; } = null!;
}
