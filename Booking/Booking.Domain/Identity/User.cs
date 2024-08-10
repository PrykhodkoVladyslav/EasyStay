using Microsoft.AspNetCore.Identity;

namespace Booking.Domain.Identity;

public abstract class User : IdentityUser<long> {
	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string Photo { get; set; } = null!;

	public virtual ICollection<UserRole> UserRoles { get; set; } = null!;
}
