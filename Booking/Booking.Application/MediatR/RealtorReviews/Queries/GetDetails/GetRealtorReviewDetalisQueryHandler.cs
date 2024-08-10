using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.RealtorReviews.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.RealtorReviews.Queries.GetDetails;

public class GetRealtorReviewDetalisQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetRealtorReviewDetalisQuery, RealtorReviewVm> {

	public async Task<RealtorReviewVm> Handle(GetRealtorReviewDetalisQuery request, CancellationToken cancellationToken) {
		var vm = await context.RealtorReviews
			.ProjectTo<RealtorReviewVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(rr => rr.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(RealtorReview), request.Id);

		return vm;
	}
}
