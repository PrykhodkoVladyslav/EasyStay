using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetAll;

public class GetAllHotelCategoriesQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetAllHotelCategoriesQuery, IEnumerable<HotelCategoryVm>> {

	public async Task<IEnumerable<HotelCategoryVm>> Handle(GetAllHotelCategoriesQuery request, CancellationToken cancellationToken) {
		var items = await context.HotelCategories
			.ProjectTo<HotelCategoryVm>(mapper.ConfigurationProvider)
			.ToArrayAsync(cancellationToken);

		return items;
	}
}
