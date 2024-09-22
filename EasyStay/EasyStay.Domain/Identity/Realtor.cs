namespace EasyStay.Domain.Identity;

public class Realtor : User {
	public ICollection<Hotel> Hotels { get; set; } = null!;

	public ICollection<RealtorReview> Reviews { get; set; } = null!;

	public ICollection<Chat> Chats { get; set; } = null!;
}
