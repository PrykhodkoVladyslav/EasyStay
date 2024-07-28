using Booking.Application.MediatR.Hotels.Commands.Create;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class HotelsController : BaseApiController {
	[HttpPost]
	[Authorize(Roles = "Admin,Realtor")]
	public async Task<IActionResult> Create([FromForm] CreateHotelCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}
}