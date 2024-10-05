namespace EasyStay.Application.Interfaces;

public interface IExistingEntityCheckerService {
	Task<bool> IsCorrectCountryIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectCityIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelIdOfCurrentUserAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelCategoryIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRentalPeriodIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRentalPeriodIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectHotelAmenityIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectBreakfastIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomIdOfCurrentUserAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectLanguageIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectLanguageNameAsync(string name, CancellationToken cancellationToken);
	Task<bool> IsNewLanguageNameAsync(long id, string name, CancellationToken cancellationToken);
	Task<bool> IsCorrectCitizenshipIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectGenderIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomTypeIdAsync(long id, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomAmenityIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken);
	Task<bool> IsCorrectRoomVariantIdOfCurrentUserAsync(long id, CancellationToken cancellationToken);
}
