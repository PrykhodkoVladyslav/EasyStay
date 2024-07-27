using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Create;

public class CreateHotelTypeCommand : IRequest<long> {
	public string Name { get; set; } = null!;
}
