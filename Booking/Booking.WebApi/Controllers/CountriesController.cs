using Booking.Application.MediatR.Countries.Commands.Create;
using Booking.Application.MediatR.Countries.Queries.GetAll;
using Booking.Application.MediatR.Countries.Queries.GetDetails;
using Booking.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Controllers;

public class CountriesController() : BaseApiController {

	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllCountriesQuery());

		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage() {

		return Ok();
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetCountryDetailsQuery() { Id = id });

		return Ok(entity);
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
