using Booking.Application.MediatR.HotelTypes.Commands.Create;
using Booking.Application.MediatR.HotelTypes.Commands.Delete;
using Booking.Application.MediatR.HotelTypes.Commands.Update;
using Booking.Application.MediatR.HotelTypes.Queries.GetAll;
using Booking.Application.MediatR.HotelTypes.Queries.GetDetails;
using Booking.Application.MediatR.HotelTypes.Queries.GetPage;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class HotelTypesController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllHotelTypesQuery());

		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetHotelTypesPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetHotelTypeDetailsQuery() { Id = id });

		return Ok(entity);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateHotelTypeCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateHotelTypeCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteHotelTypeCommand { Id = id });

		return NoContent();
	}
}
