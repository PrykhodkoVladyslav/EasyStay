using Booking.Application.MediatR.Countries.Commands.Create;
using Booking.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class CountriesController() : BaseApiController {

	[HttpGet]
	public async Task<IActionResult> GetAll() {

		return Ok();
	}

	[HttpGet]
	public async Task<IActionResult> GetPage() {

		return Ok();
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {

		return Ok();
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateCountryCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	public async Task<IActionResult> Update() {

		return Ok();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {

		return Ok();
	}
}
