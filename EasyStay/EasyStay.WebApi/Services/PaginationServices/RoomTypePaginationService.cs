using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.RoomTypes.Queries.GetPage;
using EasyStay.Application.MediatR.RoomTypes.Queries.Shared;
using EasyStay.Domain;

namespace EasyStay.WebApi.Services.PaginationServices;

public class RoomTypePaginationService(
	IEasyStayDbContext context,
	IMapper mapper
) : BasePaginationService<RoomType, RoomTypeVm, GetRoomTypesPageQuery>(mapper) {

	protected override IQueryable<RoomType> GetQuery() => context.RoomTypes.OrderBy(rt => rt.Id);

	protected override IQueryable<RoomType> FilterQuery(IQueryable<RoomType> query, GetRoomTypesPageQuery filter) {
		if (filter.Name is not null)
			query = query.Where(rt => rt.Name.ToLower().Contains(filter.Name.ToLower()));

		return query;
	}
}
