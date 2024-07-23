using Booking.Application.MediatR.Countries.Queries.Shared;
using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetDetails;

public class GetCountryDetailsQuery : IRequest<CountryVm> {
	public long Id { get; set; }
}
