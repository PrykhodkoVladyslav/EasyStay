using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.Hotels.Queries.GetDetails;

public class GetHotelDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetHotelDetailsQuery, HotelVm> {
	public async Task<HotelVm> Handle(GetHotelDetailsQuery request, CancellationToken cancellationToken) {
		var vm = await context.Hotels
			         .ProjectTo<HotelVm>(mapper.ConfigurationProvider)
			         .FirstOrDefaultAsync(h => h.Id == request.Id, cancellationToken)
		         ?? throw new NotFoundException(nameof(Country), request.Id);

		return vm;
	}
}