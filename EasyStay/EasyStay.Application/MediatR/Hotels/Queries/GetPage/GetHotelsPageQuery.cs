using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.Models.Hotel;
using EasyStay.Application.Models.Pagination;
using MediatR;

namespace EasyStay.Application.MediatR.Hotels.Queries.GetPage;

public class GetHotelsPageQuery : PaginationFilterDto, IRequest<PageVm<HotelVm>> {
	public string? Name { get; set; }

	public string? Description { get; set; }

	public TimeOnly? ArrivalTimeUtcFrom { get; set; }
	public TimeOnly? MinArrivalTimeUtcFrom { get; set; }
	public TimeOnly? MaxArrivalTimeUtcFrom { get; set; }

	public TimeOnly? ArrivalTimeUtcTo { get; set; }
	public TimeOnly? MinArrivalTimeUtcTo { get; set; }
	public TimeOnly? MaxArrivalTimeUtcTo { get; set; }

	public TimeOnly? DepartureTimeUtcFrom { get; set; }
	public TimeOnly? MinDepartureTimeUtcFrom { get; set; }
	public TimeOnly? MaxDepartureTimeUtcFrom { get; set; }

	public TimeOnly? DepartureTimeUtcTo { get; set; }
	public TimeOnly? MinDepartureTimeUtcTo { get; set; }
	public TimeOnly? MaxDepartureTimeUtcTo { get; set; }

	public float? MinRating { get; set; }

	public bool? IsArchived { get; set; }

	public HotelAddressFilterDto? Address { get; set; }

	public long? CategoryId { get; set; }

	public long? RealtorId { get; set; }

	public bool? OnlyOwn { get; set; }

	public bool? IsRandomItems { get; set; }

	public IEnumerable<long>? AllHotelAmenityIds { get; set; } = null!;
	public IEnumerable<long>? AnyHotelAmenityIds { get; set; } = null!;

	public IEnumerable<long>? AllBreakfastIds { get; set; } = null!;
	public IEnumerable<long>? AnyBreakfastIds { get; set; } = null!;

	public IEnumerable<long>? AllLanguageIds { get; set; } = null!;
	public IEnumerable<long>? AnyLanguageIds { get; set; } = null!;
}