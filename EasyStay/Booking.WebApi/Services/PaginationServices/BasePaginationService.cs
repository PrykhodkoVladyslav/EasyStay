using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.Models.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Booking.WebApi.Services.PaginationServices;

public abstract class BasePaginationService<EntityType, EntityVmType, PaginationVmType>(
	IMapper mapper
) : IPaginationService<EntityVmType, PaginationVmType> where PaginationVmType : PaginationFilterDto {

	public async Task<PageVm<EntityVmType>> GetPageAsync(PaginationVmType vm) {
		if (vm.PageSize is not null && vm.PageIndex is null)
			throw new BadRequestException("PageIndex is required if PageSize is initialized");

		if (vm.PageIndex < 0)
			throw new BadRequestException("PageIndex less than 0");

		if (vm.PageSize < 1)
			throw new BadRequestException("PageSize is invalid");


		var query = GetQuery();

		query = FilterQuery(query, vm);

		int count = await query.CountAsync();

		int pagesAvailable;

		if (vm.PageSize is not null) {
			pagesAvailable = (int)Math.Ceiling(count / (double)vm.PageSize);
			query = query
				.Skip((int)vm.PageIndex! * (int)vm.PageSize)
				.Take((int)vm.PageSize);
		}
		else {
			pagesAvailable = count > 0 ? 1 : 0;
		}

		var data = await MapAsync(query);

		return new PageVm<EntityVmType> {
			Data = data,
			PagesAvailable = pagesAvailable,
			ItemsAvailable = count
		};
	}

	protected abstract IQueryable<EntityType> GetQuery();

	protected abstract IQueryable<EntityType> FilterQuery(IQueryable<EntityType> query, PaginationVmType filter);

	protected virtual async Task<IEnumerable<EntityVmType>> MapAsync(IQueryable<EntityType> query) {
		return await query
			.ProjectTo<EntityVmType>(mapper.ConfigurationProvider)
			.ToArrayAsync();
	}
}
