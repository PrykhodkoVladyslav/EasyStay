using Booking.Application.MediatR.Hotels.Commands.Create;
using Booking.Application.MediatR.Hotels.Commands.Delete;
using Booking.Application.MediatR.Hotels.Commands.Update;
using Booking.Application.MediatR.Hotels.Queries.GetAll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class HotelsController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllHotelsQuery());

		return Ok(items);
	}

	[HttpPost]
	[Authorize(Roles = "Admin,Realtor")]
	public async Task<IActionResult> Create([FromForm] CreateHotelCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	[Authorize(Roles = "Admin,Realtor")]
	public async Task<IActionResult> Update([FromForm] UpdateHotelCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	[Authorize(Roles = "Admin,Realtor")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteHotelCommand { Id = id });

		return NoContent();
	}
}