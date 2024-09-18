using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetPage;

public class GetCountriesPageQuery : PaginationFilterDto, IRequest<PageVm<CountryVm>> {
	public string? Name { get; set; }
}
