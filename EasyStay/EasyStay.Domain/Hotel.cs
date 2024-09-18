using EasyStay.Domain.Identity;

namespace EasyStay.Domain;

public class Hotel {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public bool IsArchived { get; set; }

	public long AddressId { get; set; }
	public Address Address { get; set; } = null!;

	public long CategoryId { get; set; }
	public HotelCategory Category { get; set; } = null!;

	public long RealtorId { get; set; }
	public Realtor Realtor { get; set; } = null!;

	public ICollection<HotelPhoto> Photos { get; set; } = null!;
}
