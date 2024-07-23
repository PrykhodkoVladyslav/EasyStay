using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Domain;

namespace Booking.Application.MediatR.Countries.Queries.GetDetails;

public class CountryDetailsVm : IMapWith<Country> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Image { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<Country, CountryDetailsVm>();
	}
}
