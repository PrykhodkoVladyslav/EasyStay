using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Application.Models.Address;
using MediatR;

namespace Booking.Application.MediatR.Addresses.Commands.Update;

public class UpdateAddressCommand : IRequest, IMapWith<UpdateAddressDto> {
	public long Id { get; set; }

	public string Street { get; set; } = null!;

	public string HouseNumber { get; set; } = null!;

	public double Longitude { get; set; }

	public double Latitude { get; set; }

	public long CityId { get; set; }



	public void Mapping(Profile profile) {
		profile.CreateMap<UpdateAddressDto, UpdateAddressCommand>();
	}
}