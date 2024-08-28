using Booking.Application.Models.Email;

namespace Booking.Application.Interfaces;

public interface IEmailService {
	Task SendMessageAsync(EmailDto email, CancellationToken cancellationToken = default);
}
