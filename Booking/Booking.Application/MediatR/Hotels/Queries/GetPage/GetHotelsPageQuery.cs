using Booking.Application.MediatR.Hotels.Queries.Shared;
using Booking.Application.Models.Address;
using Booking.Application.Models.Hotel;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.Hotels.Queries.GetPage;

public class GetHotelsPageQuery : PaginationFilterDto, IRequest<PageVm<HotelVm>> {
	public string? Name { get; set; }

	public string? Description { get; set; }

	public double? Rating { get; set; }

	public double? MinRating { get; set; }
	public double? MaxRating { get; set; }

	public long? UserId { get; set; }

	public HotelAddressFilterDto? Address { get; set; }

	public long? TypeId { get; set; }

	public bool? IsRandomItems { get; set; }
}