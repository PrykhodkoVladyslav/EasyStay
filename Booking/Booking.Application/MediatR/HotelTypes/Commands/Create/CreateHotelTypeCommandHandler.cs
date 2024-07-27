using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Commands.Create;

public class CreateHotelTypeCommandHandler(
	IBookingDbContext context
) : IRequestHandler<CreateHotelTypeCommand, long> {

	public async Task<long> Handle(CreateHotelTypeCommand request, CancellationToken cancellationToken) {
		var entity = new HotelType {
			Name = request.Name
		};

		await context.HotelTypes.AddAsync(entity, cancellationToken);
		await context.SaveChangesAsync(cancellationToken);

		return entity.Id;
	}
}
