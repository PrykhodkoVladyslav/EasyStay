namespace EasyStay.Domain.Identity;

public class Customer : User {
	public ICollection<RealtorReview> RealtorReviews { get; set; } = null!;

	public ICollection<Chat> Chats { get; set; } = null!;

	public ICollection<BankCard> BankCards { get; set; } = null!;
}
