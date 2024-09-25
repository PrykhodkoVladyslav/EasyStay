using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.RentalPeriods.Queries.GetPage;
using EasyStay.Application.MediatR.RentalPeriods.Queries.Shared;
using EasyStay.Domain;

namespace EasyStay.WebApi.Services.PaginationServices;

public class RentalPeriodPaginationService(
	IBookingDbContext context,
	IMapper mapper
) : BasePaginationService<RentalPeriod, RentalPeriodVm, GetRentalPeriodsPageQuery>(mapper) {

	protected override IQueryable<RentalPeriod> GetQuery() => context.RentalPeriods.OrderBy(rp => rp.Id);

	protected override IQueryable<RentalPeriod> FilterQuery(IQueryable<RentalPeriod> query, GetRentalPeriodsPageQuery filter) {
		if (filter.Name is not null)
			query = query.Where(rp => rp.Name.ToLower().Contains(filter.Name.ToLower()));

		return query;
	}
}
