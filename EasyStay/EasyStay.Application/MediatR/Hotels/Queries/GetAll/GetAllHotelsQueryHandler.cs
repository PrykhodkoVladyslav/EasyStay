using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Hotels.Queries.GetAll;

public class GetAllHotelsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetAllHotelsQuery, IEnumerable<HotelVm>> {

	public async Task<IEnumerable<HotelVm>> Handle(GetAllHotelsQuery request, CancellationToken cancellationToken) {
		var items = await context.Hotels
			.ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			.ToArrayAsync(cancellationToken);

		return items;
	}
}