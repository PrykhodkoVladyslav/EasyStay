using AutoMapper;
using AutoMapper.QueryableExtensions;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.Application.MediatR.FavoriteHotels.Queries.GetAll;

public class GetAllFavoriteHotelsQueryHandler(
	IEasyStayDbContext context,
	IMapper mapper,
	ICurrentUserService currentUserService
) : IRequestHandler<GetAllFavoriteHotelsQuery, IEnumerable<HotelVm>> {

	public async Task<IEnumerable<HotelVm>> Handle(GetAllFavoriteHotelsQuery request, CancellationToken cancellationToken) {
		var items = await context.Hotels
			.AsNoTracking()
			.Where(h => h.FavoriteHotels.Any(fh => fh.CustomerId == currentUserService.GetRequiredUserId()))
			.ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			.ToArrayAsync(cancellationToken);

		return items;
	}
}
