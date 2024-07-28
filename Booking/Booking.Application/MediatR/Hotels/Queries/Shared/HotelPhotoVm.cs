using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Domain;

namespace Booking.Application.MediatR.Hotels.Queries.Shared;

public class HotelPhotoVm : IMapWith<HotelPhoto> {
	public string Name { get; set; } = null!;

	public int Priority { get; set; }


	
	public void Mapping(Profile profile) {
		profile.CreateMap<HotelPhoto, HotelPhotoVm>();
	}
}