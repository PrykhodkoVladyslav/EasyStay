using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace EasyStay.Application.MediatR.Hotels.Commands.Create;

public class CreateHotelCommandHandler(
	IBookingDbContext context,
	IImageService imageService,
	IMediator mediator,
	ICurrentUserService currentUserService
) : IRequestHandler<CreateHotelCommand, long> {

	public async Task<long> Handle(CreateHotelCommand request, CancellationToken cancellationToken) {
		var entity = new Hotel {
			Name = request.Name,
			Description = request.Description,
			Area = request.Area,
			NumberOfRooms = request.NumberOfRooms,
			IsArchived = request.IsArchived ?? false,
			CategoryId = request.CategoryId,
			RealtorId = currentUserService.GetRequiredUserId(),
		};
		entity.Photos = await SaveAndPrioritizePhotosAsync(request.Photos, entity);
		entity.AddressId = await mediator.Send(request.Address, cancellationToken);

		await context.Hotels.AddAsync(entity, cancellationToken);

		try {
			await context.SaveChangesAsync(cancellationToken);
		}
		catch (Exception) {
			imageService.DeleteImagesIfExists(entity.Photos.Select(p => p.Name).ToArray());
			throw;
		}

		return entity.Id;
	}

	private async Task<ICollection<HotelPhoto>>
		SaveAndPrioritizePhotosAsync(IEnumerable<IFormFile> photos, Hotel hotel) {
		var images = await imageService.SaveImagesAsync(photos);

		int index = 0;
		return images
			.Select(i => new HotelPhoto {
				Hotel = hotel,
				Name = i,
				Priority = index++
			})
			.ToArray();
	}
}