using Booking.Application.Common.Mappings;
using Booking.Domain.Identity;

namespace Booking.Application.MediatR.Accounts.Queries.GetRealtorPage;

public class RealtorItemVm : IMapWith<Realtor> {
	public long Id { get; set; }

	public string Email { get; set; } = null!;

	public string UserName { get; set; } = null!;

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;
}
