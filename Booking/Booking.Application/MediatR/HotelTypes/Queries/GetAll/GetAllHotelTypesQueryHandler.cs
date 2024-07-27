using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetAll;

public class GetAllHotelTypesQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetAllHotelTypesQuery, IEnumerable<HotelTypeVm>> {

	public async Task<IEnumerable<HotelTypeVm>> Handle(GetAllHotelTypesQuery request, CancellationToken cancellationToken) {
		var items = await context.HotelTypes
			.ProjectTo<HotelTypeVm>(mapper.ConfigurationProvider)
			.ToArrayAsync(cancellationToken);

		return items;
	}
}
