using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Countries.Commands.Create;

public class CreateCountryCommandHandler(
	IBookingDbContext context,
	IImageService imageService
) : IRequestHandler<CreateCountryCommand, long> {

	public async Task<long> Handle(CreateCountryCommand request, CancellationToken cancellationToken) {
		var entity = new Country {
			Name = request.Name,
			Image = await imageService.SaveImageAsync(request.Image)
		};

		await context.Countries.AddAsync(entity, cancellationToken);

		try {
			await context.SaveChangesAsync(cancellationToken);
		}
		catch (Exception) {
			imageService.DeleteImageIfExists(entity.Image);
			throw;
		}

		return entity.Id;
	}
}
