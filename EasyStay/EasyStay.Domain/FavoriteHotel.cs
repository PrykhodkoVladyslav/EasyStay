using EasyStay.Domain.Identity;

namespace EasyStay.Domain;

public class FavoriteHotel {
	public long HotelId;
	public Hotel Hotel = null!;

	public long CustomerId;
	public Customer Customer = null!;
}
