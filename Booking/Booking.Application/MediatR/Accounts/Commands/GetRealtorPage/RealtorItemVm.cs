using Booking.Application.Common.Mappings;
using Booking.Domain.Identity;

namespace Booking.Application.MediatR.Accounts.Commands.GetRealtorPage;

public class RealtorItemVm : IMapWith<Realtor> {
	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;
}
