using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.FavoriteHotels.Queries.GetPage;

public class GetFavoriteHotelsPageQueryHandler(
	IPaginationService<HotelVm, GetFavoriteHotelsPageQuery> pagination
) : IRequestHandler<GetFavoriteHotelsPageQuery, PageVm<HotelVm>> {

	public Task<PageVm<HotelVm>> Handle(GetFavoriteHotelsPageQuery request, CancellationToken cancellationToken) =>
		 pagination.GetPageAsync(request, cancellationToken);
}
