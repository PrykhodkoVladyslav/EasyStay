using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.RealtorReviews.Commands.Delete;

public class DeleteRealtorReviewCommandHandler(
	IBookingDbContext context,
	ICurrentUserService currentUserService
) : IRequestHandler<DeleteRealtorReviewCommand> {

	public async Task Handle(DeleteRealtorReviewCommand request, CancellationToken cancellationToken) {
		var entity = await context.RealtorReviews
			.FirstOrDefaultAsync(
				r => r.Id == request.Id && r.AuthorId == currentUserService.GetRequiredUserId(),
				cancellationToken
			)
			?? throw new NotFoundException(nameof(RealtorReview), request.Id);

		context.RealtorReviews.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}