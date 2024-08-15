using AutoMapper;
using Booking.Application.Common.Mappings;
using Booking.Domain.Identity;

namespace Booking.Application.MediatR.Accounts.Queries.GetRealtorById;

public class RealtorVm : IMapWith<Realtor> {
	public long Id { get; set; }

	public string UserName { get; set; } = null!;

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;

	public double Rating { get; set; }



	public void Mapping(Profile profile) {
		profile.CreateMap<Realtor, RealtorVm>()
			.ForMember(
				dest => dest.Rating,
				opt => opt.MapFrom(
					src => src.Reviews
						.Select(r => r.Score)
						.Average()
						.GetValueOrDefault(0)
				)
			);
	}
}
