using Booking.Application.MediatR.Countries.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetAll;

public class GetAllCountriesQuery : IRequest<IEnumerable<CountryVm>> { }
