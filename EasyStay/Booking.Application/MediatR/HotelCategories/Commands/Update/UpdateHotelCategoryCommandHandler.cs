using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Commands.Update;

public class UpdateHotelCategoryCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateHotelCategoryCommand> {

	public async Task Handle(UpdateHotelCategoryCommand request, CancellationToken cancellationToken) {
		var entity = await context.HotelCategories.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(HotelCategory), request.Id);

		entity.Name = request.Name;
		await context.SaveChangesAsync(cancellationToken);
	}
}
