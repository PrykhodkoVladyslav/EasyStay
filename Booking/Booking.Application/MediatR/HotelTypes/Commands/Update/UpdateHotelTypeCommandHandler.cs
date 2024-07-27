using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Update;

public class UpdateHotelTypeCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateHotelTypeCommand> {

	public async Task Handle(UpdateHotelTypeCommand request, CancellationToken cancellationToken) {
		var entity = await context.HotelTypes.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(HotelType), request.Id);

		entity.Name = request.Name;
		await context.SaveChangesAsync(cancellationToken);
	}
}
