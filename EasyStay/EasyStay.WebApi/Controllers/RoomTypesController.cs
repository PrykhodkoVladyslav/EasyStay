using EasyStay.Application.MediatR.RoomTypes.Commands.Create;
using EasyStay.Application.MediatR.RoomTypes.Commands.Delete;
using EasyStay.Application.MediatR.RoomTypes.Commands.Update;
using EasyStay.Application.MediatR.RoomTypes.Queries.GetAll;
using EasyStay.Application.MediatR.RoomTypes.Queries.GetDetails;
using EasyStay.Application.MediatR.RoomTypes.Queries.GetPage;
using Microsoft.AspNetCore.Mvc;

namespace EasyStay.WebApi.Controllers;

public class RoomTypesController : BaseApiController {
	[HttpGet]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllRoomTypesQuery());
		return Ok(items);
	}

	[HttpGet]
	public async Task<IActionResult> GetPage([FromQuery] GetRoomTypesPageQuery command) {
		var page = await Mediator.Send(command);

		return Ok(page);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(long id) {
		var entity = await Mediator.Send(new GetRoomTypeDetailsQuery() { Id = id });

		return Ok(entity);
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromForm] CreateRoomTypeCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}

	[HttpPut]
	public async Task<IActionResult> Update([FromForm] UpdateRoomTypeCommand command) {
		await Mediator.Send(command);

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(long id) {
		await Mediator.Send(new DeleteRoomTypeCommand { Id = id });

		return NoContent();
	}
}
