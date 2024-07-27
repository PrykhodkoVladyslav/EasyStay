using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Delete;

public class DeleteHotelTypeCommandHandler(
	IBookingDbContext context
) : IRequestHandler<DeleteHotelTypeCommand> {

	public async Task Handle(DeleteHotelTypeCommand request, CancellationToken cancellationToken) {
		var entity = await context.HotelTypes.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(HotelType), request.Id);

		context.HotelTypes.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}
