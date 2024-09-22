namespace EasyStay.Application.Models.Hotel;

public class HotelAddressFilterDto {
	public long? Id { get; set; }

	public string? Street { get; set; }

	public string? HouseNumber { get; set; }

	public HotelAddressCityFilterDto? City { get; set; }
}