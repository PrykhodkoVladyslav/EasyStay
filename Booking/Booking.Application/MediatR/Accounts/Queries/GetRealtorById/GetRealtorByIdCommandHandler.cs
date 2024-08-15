using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Domain.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Accounts.Queries.GetRealtorById;

public class GetRealtorByIdCommandHandler(
	UserManager<User> userManager,
	IMapper mapper
) : IRequestHandler<GetRealtorByIdCommand, RealtorVm> {

	public async Task<RealtorVm> Handle(GetRealtorByIdCommand request, CancellationToken cancellationToken) {
		return await userManager.Users
			.OfType<Realtor>()
			.ProjectTo<RealtorVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(Realtor), request.Id);
	}
}
