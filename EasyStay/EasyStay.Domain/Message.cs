using EasyStay.Domain.Identity;

namespace EasyStay.Domain;

public class Message {
	public long Id { get; set; }

	public string Text { get; set; } = null!;

	public DateTime CreatedAtUtc { get; set; }

	public DateTime? UpdatedAtUtc { get; set; }

	public long ChatId { get; set; }
	public Chat Chat { get; set; } = null!;

	public long AuthorId { get; set; }
	public User Author { get; set; } = null!;
}
