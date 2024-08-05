using Booking.Domain.Constants;
using FluentValidation;
using System.Text;

namespace Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;

public class RegistrationValidator : AbstractValidator<GoogleSignInCommand> {
	public RegistrationValidator() {
		RuleFor(g => g.Type)
			.Must(t => Enum.TryParse(t, out RegistrationUserType _))
				.WithMessage(BuildTypeError());
	}

	private static string BuildTypeError() {
		var errorBuilder = new StringBuilder();

		errorBuilder.Append("Type is not valid. Valid types: [ ");

		bool isNotFirst = false;
		foreach (var typeName in Enum.GetNames(typeof(RegistrationUserType))) {
			if (isNotFirst)
				errorBuilder.Append(", ");

			errorBuilder.Append(typeName);

			isNotFirst = true;
		}

		errorBuilder.Append(" ]");

		return errorBuilder.ToString();
	}
}
