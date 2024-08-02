using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Addresses.Commands.Create;

public class CreateAddressCommandHandler(
	IBookingDbContext context
) : IRequestHandler<CreateAddressCommand, long> {

	public async Task<long> Handle(CreateAddressCommand request, CancellationToken cancellationToken) {
		var entity = new Address {
			Street = request.Street,
			HouseNumber = request.HouseNumber,
			Longitude = request.Longitude,
			Latitude = request.Latitude,
			CityId = request.CityId
		};

		await context.Addresses.AddAsync(entity, cancellationToken);
		await context.SaveChangesAsync(cancellationToken);

		return entity.Id;
	}
}