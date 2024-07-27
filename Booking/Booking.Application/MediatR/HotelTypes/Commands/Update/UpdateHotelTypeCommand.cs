using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Update;

public class UpdateHotelTypeCommand : IRequest {
	public long Id { get; set; }

	public string Name { get; set; } = null!;
}
