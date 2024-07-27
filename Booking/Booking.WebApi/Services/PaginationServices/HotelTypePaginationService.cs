using AutoMapper;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelTypes.Queries.GetPage;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Domain;

namespace Booking.WebApi.Services.PaginationServices;

public class HotelTypePaginationService(
	IBookingDbContext context,
	IMapper mapper
) : BasePaginationService<HotelType, HotelTypeVm, GetHotelTypesPageQuery>(mapper) {

	protected override IQueryable<HotelType> GetQuery() => context.HotelTypes.OrderBy(c => c.Id);

	protected override IQueryable<HotelType> FilterQuery(IQueryable<HotelType> query, GetHotelTypesPageQuery paginationVm) {
		if (paginationVm.Name is not null)
			query = query.Where(ht => ht.Name.ToLower().Contains(paginationVm.Name.ToLower()));

		return query;
	}
}
