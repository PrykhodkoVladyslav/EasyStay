using Booking.Application.Interfaces;
using FluentValidation;

namespace Booking.Application.MediatR.Addresses.Commands.Create;

public class CreateAddressValidator : AbstractValidator<CreateAddressCommand> {
	public CreateAddressValidator(IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(a => a.CityId)
			.MustAsync(existingEntityCheckerService.IsCorrectCityId)
			.WithMessage("City with this id is not exists");

		RuleFor(a => a.HouseNumber)
			.NotEmpty()
			.WithMessage("House number is empty or null")
			.MaximumLength(255)
			.WithMessage("House number is too long");

		RuleFor(a => a.Street)
			.NotEmpty()
			.WithMessage("Street is empty or null")
			.MaximumLength(255)
			.WithMessage("Street is too long");

		RuleFor(a => a.Longitude)
			.InclusiveBetween(-180, 180)
			.WithMessage("Longitude must be between -180 and 180 degrees");

		RuleFor(a => a.Latitude)
			.InclusiveBetween(-90, 90)
			.WithMessage("Latitude must be between -90 and 90 degrees");
	}
}