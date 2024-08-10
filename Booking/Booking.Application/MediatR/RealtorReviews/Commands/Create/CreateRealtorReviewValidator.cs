using Booking.Application.Interfaces;
using FluentValidation;

namespace Booking.Application.MediatR.RealtorReviews.Commands.Create;

public class CreateRealtorReviewValidator : AbstractValidator<CreateRealtorReviewCommand> {
	public CreateRealtorReviewValidator(IImageValidator imageValidator, IExistingEntityCheckerService existingEntityCheckerService) {
		RuleFor(r => r.Description)
			.NotEmpty()
				.WithMessage("Description is empty or null")
			.MaximumLength(4000)
				.WithMessage("Description is too long");

		RuleFor(r => r.Score)
			.InclusiveBetween(0, 5)
				.WithMessage("Score must be in the range from 0 to 5");

		RuleFor(r => r.RealtorId)
			.NotEqual(0)
				.WithMessage("RealtorId cannot be equal to 0");
	}
}