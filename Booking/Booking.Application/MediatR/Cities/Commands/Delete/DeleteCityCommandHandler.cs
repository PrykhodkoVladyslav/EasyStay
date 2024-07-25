using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Cities.Commands.Delete;

public class DeleteCityCommandHandler(
	IBookingDbContext context,
	IImageService imageService
) : IRequestHandler<DeleteCityCommand> {

	public async Task Handle(DeleteCityCommand request, CancellationToken cancellationToken) {
		var entity = await context.Cities.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(City), request.Id);

		context.Cities.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);

		imageService.DeleteImageIfExists(entity.Image);
	}
}
