using MediatR;

namespace Booking.Application.MediatR.Countries.Commands.Delete;

public class DeleteCountryCommand : IRequest {
	public long Id { get; set; }
}
