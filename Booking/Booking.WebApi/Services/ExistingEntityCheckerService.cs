using Booking.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Booking.WebApi.Services;

public class ExistingEntityCheckerService(
	IBookingDbContext context,
	ICurrentUserService currentUserService
) : IExistingEntityCheckerService {

	public async Task<bool> IsCorrectCountryId(long id, CancellationToken cancellationToken) =>
		await context.Countries.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectCityId(long id, CancellationToken cancellationToken) =>
		await context.Cities.AnyAsync(c => c.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelId(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id, cancellationToken);

	public async Task<bool> IsCorrectHotelIdOfCurrentUser(long id, CancellationToken cancellationToken) =>
		await context.Hotels.AnyAsync(h => h.Id == id && h.UserId == currentUserService.GetRequiredUserId(),
			cancellationToken);

	public async Task<bool> IsCorrectHotelCategoryId(long id, CancellationToken cancellationToken) =>
		await context.HotelCategories.AnyAsync(hc => hc.Id == id, cancellationToken);
}