using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Cities.Queries.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Cities.Queries.GetAll;

public class GetAllCitiesQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetAllCitiesQuery, IEnumerable<CityVm>> {

	public async Task<IEnumerable<CityVm>> Handle(GetAllCitiesQuery request, CancellationToken cancellationToken) {
		var items = await context.Cities
			.ProjectTo<CityVm>(mapper.ConfigurationProvider)
			.ToArrayAsync(cancellationToken);

		return items;
	}
}
