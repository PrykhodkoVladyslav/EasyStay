using Booking.Application.MediatR.Cities.Commands.Create;
using Booking.Application.MediatR.Cities.Commands.Delete;
using Booking.Application.MediatR.Cities.Commands.Update;
using Booking.Application.MediatR.Cities.Queries.GetAll;
using Booking.Application.MediatR.Cities.Queries.GetDetails;
using Booking.Application.MediatR.Cities.Queries.GetPage;
using Booking.WebApi.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Controllers;

public class CitiesController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllCitiesQuery());

		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetCitiesPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetCityDetailsQuery() { Id = id });

		return Ok(entity);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateCityCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateCityCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteCityCommand { Id = id });

		return NoContent();
	}
}
