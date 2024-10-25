using EasyStay.Application.MediatR.Bookings.Commands.Create;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EasyStay.WebApi.Controllers;

public class BookingsController : BaseApiController {
	[HttpPost]
	[Authorize(Roles = "Customer")]
	public async Task<IActionResult> Create([FromBody] CreateBookingCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}
}
