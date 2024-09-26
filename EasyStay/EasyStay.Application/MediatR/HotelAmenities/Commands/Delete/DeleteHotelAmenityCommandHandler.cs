using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.HotelAmenities.Commands.Delete;

public class DeleteHotelAmenityCommandHandler(
	IBookingDbContext context
) : IRequestHandler<DeleteHotelAmenityCommand> {

	public async Task Handle(DeleteHotelAmenityCommand request, CancellationToken cancellationToken) {
		var entity = await context.RentalPeriods.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(RentalPeriod), request.Id);

		context.RentalPeriods.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}
