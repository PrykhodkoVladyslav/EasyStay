using Booking.Application.MediatR.Cities.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.Cities.Queries.GetAll;

public class GetAllCitiesQuery : IRequest<IEnumerable<CityVm>> { }
