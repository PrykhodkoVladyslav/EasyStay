using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Domain;

namespace Booking.Application.MediatR.Cities.Queries.Shared;

public class CityVm : IMapWith<City> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Image { get; set; } = null!;

	public double Longitude { get; set; }

	public double Latitude { get; set; }

	public CountryVm Country { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<City, CityVm>();
	}
}
