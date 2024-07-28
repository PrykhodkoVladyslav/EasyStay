using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.Hotels.Queries.GetAll;

public class GetAllHotelsQuery : IRequest<IEnumerable<HotelVm>> { }
