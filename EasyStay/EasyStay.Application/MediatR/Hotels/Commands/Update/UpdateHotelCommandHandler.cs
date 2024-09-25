using AutoMapper;
using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Addresses.Commands.Update;
using EasyStay.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.Application.MediatR.Hotels.Commands.Update;

public class UpdateHotelCommandHandler(
	IBookingDbContext context,
	IImageService imageService,
	IMediator mediator,
	IMapper mapper,
	ICurrentUserService currentUserService
) : IRequestHandler<UpdateHotelCommand> {

	public async Task Handle(UpdateHotelCommand request, CancellationToken cancellationToken) {
		var entity = await context.Hotels
			.Include(h => h.Photos)
			.FirstOrDefaultAsync(
				h => h.Id == request.Id && h.RealtorId == currentUserService.GetRequiredUserId(),
				cancellationToken
			)
			?? throw new NotFoundException(nameof(Hotel), request.Id);

		var addressCommand = mapper.Map<UpdateAddressCommand>(request.Address);
		addressCommand.Id = entity.AddressId;
		await mediator.Send(addressCommand, cancellationToken);

		var oldPhotos = entity.Photos
			.Select(p => p.Name)
			.ToArray();

		entity.Name = request.Name;
		entity.Description = request.Description;
		entity.Area = request.Area;
		entity.NumberOfRooms = request.NumberOfRooms;
		entity.IsArchived = request.IsArchived;
		entity.RentalPeriodId = request.RentalPeriodId;
		entity.CategoryId = request.CategoryId;

		entity.Photos.Clear();
		foreach (var photo in await SaveAndPrioritizePhotosAsync(request.Photos, entity))
			entity.Photos.Add(photo);

		try {
			await context.SaveChangesAsync(cancellationToken);

			imageService.DeleteImagesIfExists(oldPhotos);
		}
		catch (Exception) {
			imageService.DeleteImagesIfExists(entity.Photos.Select(p => p.Name).ToArray());
			throw;
		}
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