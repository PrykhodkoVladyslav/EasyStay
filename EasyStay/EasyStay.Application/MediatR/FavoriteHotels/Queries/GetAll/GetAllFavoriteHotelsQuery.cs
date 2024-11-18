using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using MediatR;

namespace EasyStay.Application.MediatR.FavoriteHotels.Queries.GetAll;

public class GetAllFavoriteHotelsQuery : IRequest<IEnumerable<HotelVm>> { }
