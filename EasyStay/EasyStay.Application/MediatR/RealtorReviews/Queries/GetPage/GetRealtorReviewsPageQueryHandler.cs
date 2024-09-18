using Booking.Application.Interfaces;
using Booking.Application.MediatR.RealtorReviews.Queries.Shared;
using Booking.Application.Models.Pagination;
using MediatR;

namespace Booking.Application.MediatR.RealtorReviews.Queries.GetPage;

public class GetRealtorReviewsPageQueryHandler(
	IPaginationService<RealtorReviewVm, GetRealtorReviewsPageQuery> pagination
) : IRequestHandler<GetRealtorReviewsPageQuery, PageVm<RealtorReviewVm>> {

	public Task<PageVm<RealtorReviewVm>> Handle(GetRealtorReviewsPageQuery request, CancellationToken cancellationToken) =>
		pagination.GetPageAsync(request);
}
