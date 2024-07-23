using MediatR;

namespace Booking.Application.MediatR.Countries.Queries.GetDetails;

public class GetCountryDetailsQuery : IRequest<CountryDetailsVm> {
	public long Id { get; set; }
}
