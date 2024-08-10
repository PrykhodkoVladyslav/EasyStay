using Booking.Application.Common.Mappings;
using Booking.Domain.Identity;

namespace Booking.Application.MediatR.RealtorReviews.Queries.Shared;

public class AuthorVm : IMapWith<Customer> {
	public long Id { get; set; }

	public string UserName { get; set; } = null!;

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;
}
