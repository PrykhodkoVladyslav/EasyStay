using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Hotels.Commands.SetArchiveStatus;

public class SetArchiveStatusHotelCommandHandler(
	IBookingDbContext context,
	ICurrentUserService currentUserService
) : IRequestHandler<SetArchiveStatusHotelCommand> {

	public async Task Handle(SetArchiveStatusHotelCommand request, CancellationToken cancellationToken) {
		var entity = await context.Hotels
			.FirstOrDefaultAsync(
				h => h.Id == request.Id && h.RealtorId == currentUserService.GetRequiredUserId(),
				cancellationToken
			)
			?? throw new NotFoundException(nameof(Hotel), request.Id);

		entity.IsArchived = request.IsArchived;

		await context.SaveChangesAsync(cancellationToken);
	}
}