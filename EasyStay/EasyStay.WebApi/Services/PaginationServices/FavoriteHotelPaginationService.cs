using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.FavoriteHotels.Queries.GetPage;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.WebApi.Services.PaginationServices;

public class FavoriteHotelPaginationService(
	IEasyStayDbContext context,
	IMapper mapper,
	ICurrentUserService currentUserService
) : BasePaginationService<Hotel, HotelVm, GetFavoriteHotelsPageQuery>(mapper) {

	protected override IQueryable<Hotel> GetQuery() => context.Hotels
		.OrderBy(h => h.Id)
		.AsNoTracking()
		.Where(h => h.FavoriteHotels.Any(fh => fh.CustomerId == currentUserService.GetRequiredUserId()));
}
