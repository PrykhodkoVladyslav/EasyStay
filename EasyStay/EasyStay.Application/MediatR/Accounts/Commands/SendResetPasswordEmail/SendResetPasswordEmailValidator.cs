using FluentValidation;

namespace Booking.Application.MediatR.Accounts.Commands.SendResetPasswordEmail;

public class SendResetPasswordEmailValidator : AbstractValidator<SendResetPasswordEmailCommand> {
	public SendResetPasswordEmailValidator() {
		RuleFor(r => r.Email)
			.NotEmpty()
				.WithMessage("Email is empty or null")
			.MaximumLength(100)
				.WithMessage("Email is too long")
			.EmailAddress()
				.WithMessage("Email is invalid");
	}
}
