using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.HotelAmenities.Commands.Update;

public class UpdateHotelAmenityCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateHotelAmenityCommand> {

	public async Task Handle(UpdateHotelAmenityCommand request, CancellationToken cancellationToken) {
		var entity = await context.RentalPeriods.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(HotelAmenity), request.Id);

		entity.Name = request.Name;
		await context.SaveChangesAsync(cancellationToken);
	}
}
