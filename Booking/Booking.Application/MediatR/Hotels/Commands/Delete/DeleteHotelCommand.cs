using MediatR;

namespace Booking.Application.MediatR.Hotels.Commands.Delete;

public class DeleteHotelCommand : IRequest {
	public long Id { get; set; }
}
