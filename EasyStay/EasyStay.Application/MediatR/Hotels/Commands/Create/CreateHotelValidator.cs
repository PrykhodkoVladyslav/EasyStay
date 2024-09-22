using EasyStay.Application.Interfaces;
using FluentValidation;

namespace EasyStay.Application.MediatR.Hotels.Commands.Create;

public class CreateHotelValidator : AbstractValidator<CreateHotelCommand> {
	public CreateHotelValidator(IImageValidator imageValidator, IExistingEntityCheckerService existingEntityCheckerService) {
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

		RuleFor(h => h.Area)
			.GreaterThan(0)
				.WithMessage("Area cannot be negative or equal to 0");

		RuleFor(h => h.NumberOfRooms)
			.GreaterThan(0)
				.WithMessage("Number of rooms cannot be negative or equal to 0");

		RuleFor(h => h.CategoryId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelCategoryId)
				.WithMessage("HotelCategory with this id is not exists");

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}
}