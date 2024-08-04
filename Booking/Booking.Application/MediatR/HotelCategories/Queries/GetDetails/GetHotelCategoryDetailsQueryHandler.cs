using AutoMapper;
using AutoMapper.QueryableExtensions;
using Booking.Application.Common.Exceptions;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Booking.Application.MediatR.HotelCategories.Queries.GetDetails;

public class GetHotelCategoryDetailsQueryHandler(
	IBookingDbContext context,
	IMapper mapper
) : IRequestHandler<GetHotelCategoryDetailsQuery, HotelCategoryVm> {

	public async Task<HotelCategoryVm> Handle(GetHotelCategoryDetailsQuery request, CancellationToken cancellationToken) {
		var vm = await context.HotelCategories
			.ProjectTo<HotelCategoryVm>(mapper.ConfigurationProvider)
			.FirstOrDefaultAsync(ht => ht.Id == request.Id, cancellationToken)
			?? throw new NotFoundException(nameof(HotelCategory), request.Id);

		return vm;
	}
}
