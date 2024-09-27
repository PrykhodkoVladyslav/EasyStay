using EasyStay.Application.Interfaces;
using FluentValidation;

namespace EasyStay.Application.MediatR.Hotels.Commands.Update;

public class UpdateHotelValidator : AbstractValidator<UpdateHotelCommand> {
	public UpdateHotelValidator(IImageValidator imageValidator, IExistingEntityCheckerService existingEntityCheckerService, ICollectionValidator collectionValidator) {
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
			.MustAsync(existingEntityCheckerService.IsCorrectHotelCategoryIdAsync)
				.WithMessage("HotelCategory with this id is not exists");

		RuleFor(h => h.RentalPeriodIds)
			.Must(collectionValidator.IsNullPossibleDistinct)
				.WithMessage("RentalPeriodIds cannot contain duplicates")
			.MustAsync(existingEntityCheckerService.IsCorrectRentalPeriodIdsAsync)
				.WithMessage("Not all RentalPeriods with this id exists");

		RuleFor(h => h.HotelAmenityIds)
			.Must(collectionValidator.IsNullPossibleDistinct)
				.WithMessage("HotelAmenityIds cannot contain duplicates")
			.MustAsync(existingEntityCheckerService.IsCorrectHotelAmenityIdsAsync)
				.WithMessage("Not all HotelAmenities with this id exists");

		RuleFor(h => h.BreakfastIds)
			.Must(collectionValidator.IsNullPossibleDistinct)
				.WithMessage("BreakfastIds cannot contain duplicates")
			.MustAsync(existingEntityCheckerService.IsCorrectBreakfastIdsAsync)
				.WithMessage("Not all Breakfasts with this id exists");

		RuleFor(h => h.Photos)
			.MustAsync(imageValidator.IsValidImagesAsync)
				.WithMessage("One ore more of photos are invalid");
	}
}