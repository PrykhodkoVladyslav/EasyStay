using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.FavoriteHotels.Queries.GetPage;

public class GetFavoriteHotelsPageQuery : PaginationFilterDto, IRequest<PageVm<HotelVm>> { }
