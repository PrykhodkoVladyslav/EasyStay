using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.HotelTypes.Queries.GetAll;

public class GetAllHotelTypesQuery : IRequest<IEnumerable<HotelTypeVm>> { }
