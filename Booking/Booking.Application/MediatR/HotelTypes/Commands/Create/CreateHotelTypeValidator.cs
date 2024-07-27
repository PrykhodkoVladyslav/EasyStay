using FluentValidation;

namespace Booking.Application.MediatR.HotelTypes.Commands.Create;

public class CreateHotelTypeValidator : AbstractValidator<CreateHotelTypeCommand> {
	public CreateHotelTypeValidator() {
		RuleFor(ht => ht.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");
	}
}
