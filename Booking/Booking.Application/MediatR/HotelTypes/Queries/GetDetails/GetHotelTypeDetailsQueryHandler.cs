using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetDetails;

public class GetHotelTypeDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetHotelTypeDetailsQuery, HotelTypeVm> {

	public async Task<HotelTypeVm> Handle(GetHotelTypeDetailsQuery request, CancellationToken cancellationToken) {
		var vm = await context.HotelTypes
			.ProjectTo<HotelTypeVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(ht => ht.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(HotelType), request.Id);

		return vm;
	}
}
