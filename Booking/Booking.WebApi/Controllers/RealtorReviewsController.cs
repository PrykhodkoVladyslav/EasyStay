using Booking.Application.MediatR.RealtorReviews.Queries.GetDetails;
using Booking.Application.MediatR.RealtorReviews.Queries.GetPage;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class RealtorReviewsController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetRealtorReviewsPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetRealtorReviewDetalisQuery() { Id = id });

		return Ok(entity);
	}
}
