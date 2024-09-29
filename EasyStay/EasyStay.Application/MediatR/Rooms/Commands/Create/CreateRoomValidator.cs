using EasyStay.Application.Interfaces;
using FluentValidation;

namespace EasyStay.Application.MediatR.Rooms.Commands.Create;

public class CreateRoomValidator : AbstractValidator<CreateRoomCommand> {
	public CreateRoomValidator(IExistingEntityCheckerService existingEntityCheckerService, ICollectionValidator collectionValidator) {
		RuleFor(r => r.Area)
			.GreaterThan(0)
				.WithMessage("Area cannot be negative or equal to 0");

		RuleFor(r => r.NumberOfRooms)
			.GreaterThan(0)
				.WithMessage("Number of rooms cannot be negative or equal to 0");

		RuleFor(r => r.Quentity)
			.GreaterThan(0)
				.WithMessage("Quentity of available rooms cannot be negative or equal to 0");

		RuleFor(r => r.HotelId)
			.MustAsync(existingEntityCheckerService.IsCorrectHotelIdOfCurrentUserAsync)
				.WithMessage("Hotel with this id does not exist or you don't have access to it");

		RuleFor(r => r.RentalPeriodIds)
			.Must(collectionValidator.IsNullPossibleDistinct)
				.WithMessage("RentalPeriodIds cannot contain duplicates")
			.MustAsync(existingEntityCheckerService.IsCorrectRentalPeriodIdsAsync)
				.WithMessage("Not all RentalPeriods with this id exists");
	}
}
