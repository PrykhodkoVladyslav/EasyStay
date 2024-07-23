using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Booking.WebApi.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public abstract class BaseApiController : ControllerBase {
	private IMediator _mediator = null!;
	protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();

	internal long? UserId;

	protected BaseApiController() {
		UserId = GetUserId();
	}

	private long? GetUserId() {
		if ((User?.Identity?.IsAuthenticated) != true) {
			return null;
		}

		var claim = User.FindFirst(ClaimTypes.NameIdentifier);

		if (claim is null) {
			return null;
		}

		return Convert.ToInt32(claim.Value);
	}
}
