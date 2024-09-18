using Booking.Application.MediatR.HotelCategories.Commands.Create;
using Booking.Application.MediatR.HotelCategories.Commands.Delete;
using Booking.Application.MediatR.HotelCategories.Commands.Update;
using Booking.Application.MediatR.HotelCategories.Queries.GetAll;
using Booking.Application.MediatR.HotelCategories.Queries.GetDetails;
using Booking.Application.MediatR.HotelCategories.Queries.GetPage;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class HotelCategoriesController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllHotelCategoriesQuery());

		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetHotelCategoriesPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetHotelCategoryDetailsQuery() { Id = id });

		return Ok(entity);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateHotelCategoryCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateHotelCategoryCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteHotelCategoryCommand { Id = id });

		return NoContent();
	}
}
