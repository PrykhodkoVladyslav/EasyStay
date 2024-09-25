namespace EasyStay.Application.Interfaces;

public interface IExistingEntityCheckerService {
	Task<bool> IsCorrectCountryIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectCityIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelIdOfCurrentUserAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelCategoryIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRentalPeriodIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRentalPeriodIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	//Task<bool> IsCorrectHotelReviewId(long id, CancellationToken cancellationToken);
	//Task<bool> IsCorrectHotelReviewIdOfCurrentUser(long id, CancellationToken cancellationToken);
	//Task<bool> IsCorrectHotelReviewByBookingIdAndUserId(long bookingId, CancellationToken cancellationToken);
	//Task<bool> IsCorrectFavoriteHotelKey(long hotelId, long userId, CancellationToken cancellationToken);
	//Task<bool> IsCorrectConvenienceId(long id, CancellationToken cancellationToken);
	//Task<bool> IsCorrectConvenienceIds(IEnumerable<long>? ids, CancellationToken cancellationToken);
	//Task<bool> IsCorrectRoomId(long id, CancellationToken cancellationToken);
	//Task<bool> IsCorrectRoomIdOfCurrentUser(long id, CancellationToken cancellationToken);
	//Task<bool> IsCorrectBookingId(long id, CancellationToken cancellationToken);
}