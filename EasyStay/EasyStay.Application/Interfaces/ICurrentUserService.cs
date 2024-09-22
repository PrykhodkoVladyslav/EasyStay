namespace EasyStay.Application.Interfaces;

public interface ICurrentUserService {
	long GetRequiredUserId();
	string GetRequiredUserEmail();
}
