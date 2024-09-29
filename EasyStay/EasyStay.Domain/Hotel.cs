using EasyStay.Domain.Identity;

namespace EasyStay.Domain;

public class Hotel {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public DateTimeOffset ArrivalTimeUtc { get; set; }

	public DateTimeOffset DepartureTimeUtc { get; set; }

	public bool IsArchived { get; set; }

	public long AddressId { get; set; }
	public Address Address { get; set; } = null!;

	public long HotelCategoryId { get; set; }
	public HotelCategory HotelCategory { get; set; } = null!;

	public long RealtorId { get; set; }
	public Realtor Realtor { get; set; } = null!;

	public ICollection<HotelHotelAmenity> HotelHotelAmenities { get; set; } = null!;

	public ICollection<HotelBreakfast> HotelBreakfasts { get; set; } = null!;

	public ICollection<Room> Rooms { get; set; } = null!;

	public ICollection<HotelPhoto> Photos { get; set; } = null!;
}
