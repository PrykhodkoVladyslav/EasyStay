using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Delete;

public class DeleteHotelTypeCommand : IRequest {
	public long Id { get; set; }
}
