using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Domain;

namespace Booking.Application.MediatR.HotelTypes.Queries.Shared;

public class HotelTypeVm : IMapWith<HotelType> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<HotelType, HotelTypeVm>();
	}
}
