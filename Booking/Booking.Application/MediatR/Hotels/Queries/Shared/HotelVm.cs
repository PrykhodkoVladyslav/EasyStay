using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Application.MediatR.Addresses.Queries.Shared;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Domain;

namespace Booking.Application.MediatR.Hotels.Queries.Shared;

public class HotelVm : IMapWith<Hotel> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public bool IsArchived { get; set; }

	public long UserId { get; set; }

	public AddressVm Address { get; set; } = null!;

	public HotelCategoryVm Category { get; set; } = null!;

	public IEnumerable<HotelPhotoVm> Photos { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<Hotel, HotelVm>();
	}
}