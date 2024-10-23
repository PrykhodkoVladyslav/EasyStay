using EasyStay.Application.MediatR.BankCards.Commands.Create;
using EasyStay.Application.MediatR.BankCards.Queries.GetAll;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EasyStay.WebApi.Controllers;

public class BankCardsController : BaseApiController {
	[HttpGet]
	[Authorize(Roles = "Customer")]
	public async Task<IActionResult> GetAll() {
		var items = await Mediator.Send(new GetAllBankCardsQuery());
		return Ok(items);
	}

	[HttpPost]
	[Authorize(Roles = "Customer")]
	public async Task<IActionResult> Create([FromBody] CreateBankCardCommand command) {
		var id = await Mediator.Send(command);

		return Ok(id);
	}
}
