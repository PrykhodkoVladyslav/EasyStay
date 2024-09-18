using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Countries.Queries.GetDetails;

public class GetCountryDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetCountryDetailsQuery, CountryVm> {

	public async Task<CountryVm> Handle(GetCountryDetailsQuery request, CancellationToken cancellationToken) {
		var vm = await context.Countries
			.ProjectTo<CountryVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(Country), request.Id);

		return vm;
	}
}
