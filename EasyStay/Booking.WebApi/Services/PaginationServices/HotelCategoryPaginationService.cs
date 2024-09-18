using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelCategories.Queries.GetPage;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Domain;

namespace Booking.WebApi.Services.PaginationServices;

public class HotelCategoryPaginationService(
	IBookingDbContext context,
	IMapper mapper
) : BasePaginationService<HotelCategory, HotelCategoryVm, GetHotelCategoriesPageQuery>(mapper) {

	protected override IQueryable<HotelCategory> GetQuery() => context.HotelCategories.OrderBy(hc => hc.Id);

	protected override IQueryable<HotelCategory> FilterQuery(IQueryable<HotelCategory> query, GetHotelCategoriesPageQuery filter) {
		if (filter.Name is not null)
			query = query.Where(hc => hc.Name.ToLower().Contains(filter.Name.ToLower()));

		return query;
	}
}
