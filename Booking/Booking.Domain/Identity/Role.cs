using Microsoft.AspNetCore.Identity;

namespace Booking.Domain.Identity;

public class Role : IdentityRole<long> {
	public virtual ICollection<UserRole> UserRoles { get; set; } = null!;
}
