using EasyStay.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.WebApi.Services;

public class ExistingEntityCheckerService(
	IBookingDbContext context,
	ICurrentUserService currentUserService
) : IExistingEntityCheckerService {

	public async Task<bool> IsCorrectCountryIdAsync(long id, CancellationToken cancellationToken) =>
		await context.Countries.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectCityIdAsync(long id, CancellationToken cancellationToken) =>
		await context.Cities.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelIdAsync(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelIdOfCurrentUserAsync(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id && h.RealtorId == currentUserService.GetRequiredUserId(),
			cancellationToken);

	public async Task<bool> IsCorrectHotelCategoryIdAsync(long id, CancellationToken cancellationToken) =>
		await context.HotelCategories.AnyAsync(hc => hc.Id == id, cancellationToken);

	public Task<bool> IsCorrectRentalPeriodIdAsync(long id, CancellationToken cancellationToken) =>
		context.RentalPeriods.AsNoTracking().AnyAsync(rp => rp.Id == id, cancellationToken);

	public async Task<bool> IsCorrectRentalPeriodIdsAsync(IEnumerable<long>? ids, CancellationToken cancellationToken) {
		if (ids is null)
			return true;

		var conveniencesFromDb = await context.RentalPeriods
			.Where(rp => ids.Contains(rp.Id))
			.Select(rp => rp.Id)
			.ToArrayAsync(cancellationToken);

		return ids.All(id => conveniencesFromDb.Contains(id));
	}
}