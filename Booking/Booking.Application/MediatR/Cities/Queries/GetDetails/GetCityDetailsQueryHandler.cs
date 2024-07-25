using AutoMapper;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Cities.Queries.Shared;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Cities.Queries.GetDetails;

public class GetCityDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetCityDetailsQuery, CityVm> {

	public async Task<CityVm> Handle(GetCityDetailsQuery request, CancellationToken cancellationToken) {
		var entity = await context.Cities.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(City), request.Id);

		var vm = mapper.Map<CityVm>(entity);
		return vm;
	}
}
