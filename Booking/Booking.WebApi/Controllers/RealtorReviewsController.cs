using Booking.Application.MediatR.RealtorReviews.Queries.GetDetails;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class RealtorReviewsController : BaseApiController {
	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetRealtorReviewDetalisQuery() { Id = id });

		return Ok(entity);
	}
}
