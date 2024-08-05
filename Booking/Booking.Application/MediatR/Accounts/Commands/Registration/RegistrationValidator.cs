using Booking.Application.Interfaces;
using Booking.Domain.Constants;
using Booking.Domain.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace Booking.Application.MediatR.Accounts.Commands.Registration;

public class RegistrationValidator : AbstractValidator<RegistrationCommand> {
	private readonly UserManager<User> _userManager;

	public RegistrationValidator(UserManager<User> userManager, IImageValidator imageValidator) {
		_userManager = userManager;

		RuleFor(r => r.Email)
			.NotEmpty()
				.WithMessage("Email is empty or null")
			.MaximumLength(100)
				.WithMessage("Email is too long")
			.EmailAddress()
				.WithMessage("Email is invalid")
			.MustAsync(IsNewEmail)
				.WithMessage("There is already a user with this email");

		RuleFor(r => r.UserName)
			.NotEmpty()
				.WithMessage("Username is empty or null")
			.MaximumLength(100)
				.WithMessage("Username is too long")
			.MustAsync(IsNewUserName)
				.WithMessage("There is already a user with this username");

		RuleFor(r => r.FirstName)
			.NotEmpty()
				.WithMessage("FirstName is empty or null")
			.MaximumLength(100)
				.WithMessage("FirstName is too long");

		RuleFor(r => r.LastName)
			.NotEmpty()
				.WithMessage("LastName is empty or null")
			.MaximumLength(100)
				.WithMessage("LastName is too long");

		RuleFor(r => r.Image)
			.NotNull()
				.WithMessage("Image is not selected")
			.MustAsync(imageValidator.IsValidImageAsync)
				.WithMessage("Image is not valid");

		RuleFor(r => r.Password)
			.NotEmpty()
				.WithMessage("Password is empty or null")
			.MinimumLength(8)
				.WithMessage("Password is too short");

		RuleFor(r => r.Type)
			.Must(t => Enum.TryParse(t, out RegistrationUserType _))
				.WithMessage(BuildTypeError());
	}

	private async Task<bool> IsNewEmail(string email, CancellationToken _) {
		return await _userManager.FindByEmailAsync(email) is null;
	}

	private async Task<bool> IsNewUserName(string userName, CancellationToken _) {
		return await _userManager.FindByNameAsync(userName) is null;
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
