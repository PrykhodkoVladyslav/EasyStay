using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetDetails;

public class GetHotelCategoryDetailsQuery : IRequest<HotelCategoryVm> {
	public long Id { get; set; }
}
