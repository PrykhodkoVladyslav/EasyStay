using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Countries.Commands.Delete;

public class DeleteCountryCommandHandler(
	IBookingDbContext context,
	IImageService imageService
) : IRequestHandler<DeleteCountryCommand> {

	public async Task Handle(DeleteCountryCommand request, CancellationToken cancellationToken) {
		var entity = await context.Countries.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Country), request.Id);

		context.Countries.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);

		imageService.DeleteImageIfExists(entity.Image);
	}
}
