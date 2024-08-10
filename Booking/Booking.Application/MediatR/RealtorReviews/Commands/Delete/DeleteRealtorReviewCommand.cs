using MediatR;

namespace Booking.Application.MediatR.RealtorReviews.Commands.Delete;

public class DeleteRealtorReviewCommand : IRequest {
	public long Id { get; set; }
}
