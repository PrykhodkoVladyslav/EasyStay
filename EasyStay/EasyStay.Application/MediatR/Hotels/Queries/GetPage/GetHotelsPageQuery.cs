using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.Models.Hotel;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.Hotels.Queries.GetPage;

public class GetHotelsPageQuery : PaginationFilterDto, IRequest<PageVm<HotelVm>> {
	public string? Name { get; set; }

	public string? Description { get; set; }

	public DateTimeOffset? ArrivalTimeUtc { get; set; }
	public DateTimeOffset? MinArrivalTimeUtc { get; set; }
	public DateTimeOffset? MaxArrivalTimeUtc { get; set; }

	public DateTimeOffset? DepartureTimeUtc { get; set; }
	public DateTimeOffset? MinDepartureTimeUtc { get; set; }
	public DateTimeOffset? MaxDepartureTimeUtc { get; set; }

	public bool? IsArchived { get; set; }

	public HotelAddressFilterDto? Address { get; set; }

	public long? CategoryId { get; set; }

	public long? RealtorId { get; set; }

	public bool? IsRandomItems { get; set; }

	public IEnumerable<long>? AllHotelAmenityIds { get; set; } = null!;
	public IEnumerable<long>? AnyHotelAmenityIds { get; set; } = null!;

	public IEnumerable<long>? AllBreakfastIds { get; set; } = null!;
	public IEnumerable<long>? AnyBreakfastIds { get; set; } = null!;
}