using Booking.Application.MediatR.RealtorReviews.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.RealtorReviews.Queries.GetDetails;

public class GetRealtorReviewDetalisQuery : IRequest<RealtorReviewVm> {
	public long Id { get; set; }
}
