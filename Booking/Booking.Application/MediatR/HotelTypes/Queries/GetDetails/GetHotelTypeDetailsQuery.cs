using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetDetails;

public class GetHotelTypeDetailsQuery : IRequest<HotelTypeVm> {
	public long Id { get; set; }
}
