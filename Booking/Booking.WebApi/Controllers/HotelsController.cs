using Booking.Application.MediatR.Hotels.Commands.Create;
using Booking.Application.MediatR.Hotels.Commands.Delete;
using Booking.Application.MediatR.Hotels.Commands.Update;
using Booking.Application.MediatR.Hotels.Queries.GetAll;
using Booking.Application.MediatR.Hotels.Queries.GetDetails;
using Booking.Application.MediatR.Hotels.Queries.GetPage;
using Booking.Application.MediatR.RealtorReviews.Queries.GetPage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class HotelsController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllHotelsQuery());

		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetHotelsPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetHotelDetailsQuery() { Id = id });

		return Ok(entity);
	}

	[HttpPost]
	[Authorize(Roles = "Realtor")]
	public async Task<IActionResult> Create([FromForm] CreateHotelCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	[Authorize(Roles = "Realtor")]
	public async Task<IActionResult> Update([FromForm] UpdateHotelCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	[Authorize(Roles = "Realtor")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteHotelCommand { Id = id });

		return NoContent();
	}
}
