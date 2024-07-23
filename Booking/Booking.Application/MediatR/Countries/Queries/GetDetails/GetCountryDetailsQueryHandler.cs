using AutoMapper;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetDetails;

public class GetCountryDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetCountryDetailsQuery, CountryDetailsVm> {

	public async Task<CountryDetailsVm> Handle(GetCountryDetailsQuery request, CancellationToken cancellationToken) {
		var entity = await context.Countries.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(Country), request.Id);

		var vm = mapper.Map<CountryDetailsVm>(entity);
		return vm;
	}
}
