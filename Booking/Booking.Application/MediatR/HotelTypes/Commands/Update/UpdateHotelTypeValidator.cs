using FluentValidation;

namespace Booking.Application.MediatR.HotelTypes.Commands.Update;

public class UpdateHotelTypeValidator : AbstractValidator<UpdateHotelTypeCommand> {
	public UpdateHotelTypeValidator() {
		RuleFor(ht => ht.Name)
			.NotEmpty()
				.WithMessage("Name is empty or null")
			.MaximumLength(255)
				.WithMessage("Name is too long");
	}
}
