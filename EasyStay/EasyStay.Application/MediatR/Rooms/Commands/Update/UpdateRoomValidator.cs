using EasyStay.Application.Interfaces;
using FluentValidation;

namespace EasyStay.Application.MediatR.Rooms.Commands.Update;

public class UpdateRoomValidator : AbstractValidator<UpdateRoomCommand> {
	public UpdateRoomValidator(IExistingEntityCheckerService existingEntityCheckerService, ICollectionValidator collectionValidator) {
		RuleFor(r => r.Id)
			.MustAsync(existingEntityCheckerService.IsCorrectRoomIdOfCurrentUserAsync)
				.WithMessage("Room with this id does not exist or you are not the owner of this room");

		RuleFor(r => r.Area)
			.GreaterThan(0)
				.WithMessage("Area cannot be negative or equal to 0");

		RuleFor(r => r.NumberOfRooms)
			.GreaterThan(0)
				.WithMessage("Number of rooms cannot be negative or equal to 0");

		RuleFor(r => r.Quentity)
			.GreaterThan(0)
				.WithMessage("Quentity of available rooms cannot be negative or equal to 0");

		RuleFor(h => h.RentalPeriodIds)
			.Must(collectionValidator.IsNullPossibleDistinct)
				.WithMessage("RentalPeriodIds cannot contain duplicates")
			.MustAsync(existingEntityCheckerService.IsCorrectRentalPeriodIdsAsync)
				.WithMessage("Not all RentalPeriods with this id exists");
	}
}
