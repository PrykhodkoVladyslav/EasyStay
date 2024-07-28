using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Addresses.Commands.Delete;

public class DeleteAddressCommandHandler(
	IBookingDbContext context,
	IImageService imageService
) : IRequestHandler<DeleteAddressCommand> {
	public async Task Handle(DeleteAddressCommand request, CancellationToken cancellationToken) {
		var entity = await context.Addresses.FindAsync([request.Id], cancellationToken)
		             ?? throw new NotFoundException(nameof(Address), request.Id);

		context.Addresses.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}