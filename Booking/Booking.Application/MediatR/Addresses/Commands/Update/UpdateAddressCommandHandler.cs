using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Addresses.Commands.Update;

public class UpdateAddressCommandHandler(
	IBookingDbContext context
) : IRequestHandler<UpdateAddressCommand> {

	public async Task Handle(UpdateAddressCommand request, CancellationToken cancellationToken) {
		var entity = await context.Addresses
			.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Address), request.Id);

		entity.Street = request.Street;
		entity.HouseNumber = request.HouseNumber;
		entity.Longitude = request.Longitude;
		entity.Latitude = request.Latitude;
		entity.CityId = request.CityId;

		await context.SaveChangesAsync(cancellationToken);
	}
}