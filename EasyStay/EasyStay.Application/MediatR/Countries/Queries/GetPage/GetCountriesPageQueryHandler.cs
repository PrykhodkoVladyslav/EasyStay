using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Countries.Queries.Shared;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.Countries.Queries.GetPage;

public class GetCountriesPageQueryHandler(
	IPaginationService<CountryVm, GetCountriesPageQuery> pagination
) : IRequestHandler<GetCountriesPageQuery, PageVm<CountryVm>> {

	public async Task<PageVm<CountryVm>> Handle(GetCountriesPageQuery request, CancellationToken cancellationToken) {
		return await pagination.GetPageAsync(request);
	}
}
