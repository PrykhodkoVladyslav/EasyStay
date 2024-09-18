using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Cities.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Cities.Queries.GetDetails;

public class GetCityDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetCityDetailsQuery, CityVm> {

	public async Task<CityVm> Handle(GetCityDetailsQuery request, CancellationToken cancellationToken) {
		var vm = await context.Cities
			.ProjectTo<CityVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(City), request.Id);

		return vm;
	}
}
