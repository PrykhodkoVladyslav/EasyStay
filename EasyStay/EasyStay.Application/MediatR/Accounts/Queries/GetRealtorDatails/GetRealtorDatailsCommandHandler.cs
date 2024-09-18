using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Domain.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Accounts.Queries.GetRealtorDatails;

public class GetRealtorDatailsCommandHandler(
	UserManager<User> userManager,
	IMapper mapper
) : IRequestHandler<GetRealtorDatailsCommand, RealtorDatailsVm> {

	public async Task<RealtorDatailsVm> Handle(GetRealtorDatailsCommand request, CancellationToken cancellationToken) {
		return await userManager.Users
			.OfType<Realtor>()
			.ProjectTo<RealtorDatailsVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(Realtor), request.Id);
	}
}
