using Booking.Application.MediatR.Accounts.Commands.BlockUserById;
using Booking.Application.MediatR.Accounts.Commands.CreateAdmin;
using Booking.Application.MediatR.Accounts.Commands.GoogleSignIn;
using Booking.Application.MediatR.Accounts.Commands.Registration;
using Booking.Application.MediatR.Accounts.Commands.SignIn;
using Booking.Application.MediatR.Accounts.Commands.UnlockUserById;
using Booking.Application.MediatR.Accounts.Queries.GetCustomerPage;
using Booking.Application.MediatR.Accounts.Queries.GetRealtorDatails;
using Booking.Application.MediatR.Accounts.Queries.GetRealtorPage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking.WebApi.Controllers;

public class AccountsController : BaseApiController {
	[HttpPost]
	public async Task<IActionResult> SignIn([FromForm] SignInCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}

	[HttpPost]
	public async Task<IActionResult> Registration([FromForm] RegistrationCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}

	[HttpPost]
	[Authorize(Roles = "Admin")]
	public async Task<long> CreateAdminAsync([FromForm] CreateAdminCommand command) {
		var id = await Mediator.Send(command);

		return id;
	}

	[HttpPost]
	public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInCommand command) {
		var token = await Mediator.Send(command);

		return Ok(token);
	}

	[HttpGet]
	[Authorize(Roles = "Admin")]
	public async Task<IActionResult> GetCustomerPage([FromQuery] GetCustomerPageCommand command) {
		var customers = await Mediator.Send(command);

		return Ok(customers);
	}

	[HttpGet]
	[Authorize(Roles = "Admin")]
	public async Task<IActionResult> GetRealtorPage([FromQuery] GetRealtorPageCommand command) {
		var realtors = await Mediator.Send(command);

		return Ok(realtors);
	}

	[HttpPatch]
	[Authorize(Roles = "Admin")]
	public async Task<IActionResult> BlockUserByIdAsync([FromBody] BlockUserByIdCommand command) {
		await Mediator.Send(command);

		return Ok();
	}

	[HttpPatch("{id}")]
	[Authorize(Roles = "Admin")]
	public async Task<IActionResult> UnlockUserByIdAsync([FromRoute] long id) {
		await Mediator.Send(new UnlockUserByIdCommand { Id = id });

		return Ok();
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetRealtorDatails([FromRoute] long id) {
		var realtor = await Mediator.Send(new GetRealtorDatailsCommand { Id = id });

		return Ok(realtor);
	}
}
