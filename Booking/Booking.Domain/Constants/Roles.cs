namespace Booking.Domain.Constants;

public static class Roles {
	public const string Admin = "Admin";
	public const string Realtor = "Realtor";
	public const string User = "User";

	public static readonly IReadOnlyList<string> All = [
		Admin,
		Realtor,
		User
	];
}
