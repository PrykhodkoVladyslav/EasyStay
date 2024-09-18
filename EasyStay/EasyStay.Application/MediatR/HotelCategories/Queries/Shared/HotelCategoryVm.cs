using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Domain;

namespace Booking.Application.MediatR.HotelCategories.Queries.Shared;

public class HotelCategoryVm : IMapWith<HotelCategory> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<HotelCategory, HotelCategoryVm>();
	}
}
