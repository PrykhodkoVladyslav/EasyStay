using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Bookings.Queries.GetPage;
using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.WebApi.Services.PaginationServices;

public class BookingPaginationService(
	IEasyStayDbContext context,
	IMapper mapper
) : BasePaginationService<Booking, BookingVm, GetBookingsPageQuery>(mapper) {

	protected override IQueryable<Booking> GetQuery() => context.Bookings
		.AsNoTracking()
		.AsSplitQuery()
		.OrderBy(b => b.Id);
}
