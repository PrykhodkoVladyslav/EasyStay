using EasyStay.Application.MediatR.Accounts.Commands.Shared;
using MediatR;

namespace EasyStay.Application.MediatR.Accounts.Commands.GoogleSignIn;

public class GoogleSignInCommand : IRequest<JwtTokenVm> {
	public string Credential { get; set; } = null!;
	public string Type { get; set; } = null!;
}
