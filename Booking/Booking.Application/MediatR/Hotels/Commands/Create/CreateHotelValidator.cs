using Booking.Application.Interfaces;
using Booking.Application.MediatR.Addresses.Commands.Create;
using FluentValidation;

namespace Booking.Application.MediatR.Hotels.Commands.Create;

public class CreateHotelValidator : AbstractValidator<CreateHotelCommand> {
	public CreateHotelValidator(IImageValidator imageValidator, IValidator<CreateAddressCommand> addressValidator,
		IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(h => h.Name)
			.NotEmpty()
			.WithMessage("Name is empty or null")
			.MaximumLength(255)
			.WithMessage("Name is too long");

		RuleFor(h => h.Description)
			.NotEmpty()
			.WithMessage("Description is empty or null")
			.MaximumLength(4000)
			.WithMessage("Description is too long (4000)");

		RuleFor(h => h.TypeId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelTypeId)
			.WithMessage("HotelType with this id is not exists");

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
			.WithMessage("One ore more of photos are invalid");
	}
}