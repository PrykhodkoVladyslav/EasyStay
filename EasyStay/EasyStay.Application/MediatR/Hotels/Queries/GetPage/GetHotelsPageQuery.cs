using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.Models.Hotel;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.Hotels.Queries.GetPage;

public class GetHotelsPageQuery : PaginationFilterDto, IRequest<PageVm<HotelVm>> {
	public string? Name { get; set; }

	public string? Description { get; set; }

	public TimeOnly? ArrivalTimeUtc { get; set; }
	public TimeOnly? MinArrivalTimeUtc { get; set; }
	public TimeOnly? MaxArrivalTimeUtc { get; set; }

	public TimeOnly? DepartureTimeUtc { get; set; }
	public TimeOnly? MinDepartureTimeUtc { get; set; }
	public TimeOnly? MaxDepartureTimeUtc { get; set; }

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