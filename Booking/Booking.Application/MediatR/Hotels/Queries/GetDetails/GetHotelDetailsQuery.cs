using Booking.Application.MediatR.Hotels.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.Hotels.Queries.GetDetails;

public class GetHotelDetailsQuery : IRequest<HotelVm> {
	public long Id { get; set; }
}