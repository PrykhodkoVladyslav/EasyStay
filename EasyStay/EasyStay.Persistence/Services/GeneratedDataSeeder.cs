using Bogus;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.Persistence.Services;

public class GeneratedDataSeeder(
	IEasyStayDbContext context,
	IImageService imageService
) : IGeneratedDataSeeder {

	public async Task SeedAsync(CancellationToken cancellationToken = default) {
		if (!await context.Addresses.AnyAsync(cancellationToken))
			await SeedAddressesAsync(cancellationToken);

		if (!await context.HotelCategories.AnyAsync(cancellationToken))
			await SeedHotelCategoriesAsync(cancellationToken);

		if (!await context.Hotels.AnyAsync(cancellationToken))
			await SeedHotelsAsync(cancellationToken);

		if (!await context.HotelPhotos.AnyAsync(cancellationToken))
			await SeedHotelPhotosAsync(cancellationToken);

		if (!await context.RealtorReviews.AnyAsync(cancellationToken))
			await SeedRealtorReviewsAsync(cancellationToken);

		if (!await context.RoomRentalPeriods.AnyAsync(cancellationToken))
			await SeedRoomRentalPeriodsAsync(cancellationToken);

		if (!await context.RoomTypes.AnyAsync(cancellationToken))
			await SeedRoomTypesAsync(cancellationToken);
	}

	private async Task SeedAddressesAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();

		var cities = await context.Cities.ToArrayAsync(cancellationToken);

		if (cities.Length == 0)
			return;

		for (int i = 0; i < 100; i++) {
			var city = faker.PickRandom(cities);

			int? floor = faker.Random.Int(0, 10);
			if (floor == 0)
				floor = null;

			string? apartmentNumber = null;
			if (floor is not null && faker.Random.Bool(0.5f))
				apartmentNumber = faker.Random.Int(1, 100).ToString();

			var address = new Address() {
				Street = faker.Address.StreetName(),
				HouseNumber = faker.Address.BuildingNumber(),
				CityId = city.Id,
				Floor = floor,
				ApartmentNumber = apartmentNumber
			};

			await context.Addresses.AddAsync(address, cancellationToken);
		}

		await context.SaveChangesAsync(cancellationToken);
	}

	private async Task SeedHotelCategoriesAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();
		var uniqueNames = new HashSet<string>();

		while (uniqueNames.Count < 10) {
			var newHotelTypeName = faker.Commerce.Department();

			if (uniqueNames.Add(newHotelTypeName)) {
				var hotelCategory = new HotelCategory { Name = newHotelTypeName };

				await context.HotelCategories.AddAsync(hotelCategory, cancellationToken);
			}
		}

		await context.SaveChangesAsync(cancellationToken);
	}

	private async Task SeedHotelsAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();
		Random random = new Random();

		var addressesId = await context.Addresses.Select(c => c.Id).ToArrayAsync(cancellationToken);
		var categoryIds = await context.HotelCategories.Select(hc => hc.Id).ToArrayAsync(cancellationToken);
		var userIds = await context.Realtors.Select(u => u.Id).ToArrayAsync(cancellationToken);
		var hotelAmenityIds = await context.HotelAmenities.Select(ha => ha.Id).ToArrayAsync(cancellationToken);

		foreach (var address in addressesId) {
			int numberOfRooms = random.Next(1, 21);
			double areaPerRoom = Math.Round(5 + (random.NextDouble() * 45), 2);
			double area = Math.Round(numberOfRooms * areaPerRoom, 2);
			var randomHotelAmenityIds = faker.PickRandom(hotelAmenityIds, random.Next(0, hotelAmenityIds.Length));

			Hotel hotel = new() {
				Name = faker.Company.CompanyName(),
				Description = faker.Lorem.Sentences(5),
				ArrivalTimeUtcFrom = GetRandomTimeUtc(faker),
				ArrivalTimeUtcTo = GetRandomTimeUtc(faker),
				DepartureTimeUtcFrom = GetRandomTimeUtc(faker),
				DepartureTimeUtcTo = GetRandomTimeUtc(faker),
				IsArchived = random.Next(0, 2) == 1,
				AddressId = address,
				HotelCategoryId = faker.PickRandom(categoryIds),
				RealtorId = faker.PickRandom(userIds)
			};

			hotel.HotelHotelAmenities = randomHotelAmenityIds
				.Select(haId => new HotelHotelAmenity {
					Hotel = hotel,
					HotelAmenityId = haId
				})
				.ToArray();

			await context.Hotels.AddAsync(hotel, cancellationToken);
		}

		await context.SaveChangesAsync(cancellationToken);
	}

	private async Task SeedHotelPhotosAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();

		using var httpClient = new HttpClient();

		var hotelsId = await context.Hotels.Select(c => c.Id).ToListAsync(cancellationToken);

		foreach (var hotel in hotelsId) {
			var photoCount = faker.Random.Int(1, 5);

			for (int i = 0; i < photoCount; i++) {
				var imageUrl = faker.Image.LoremFlickrUrl(keywords: "hotel");
				var imageBytes = await GetImageAsBytesAsync(httpClient, imageUrl);

				var hotelPhoto = new HotelPhoto {
					Name = await imageService.SaveImageAsync(imageBytes),
					Priority = i,
					HotelId = hotel
				};

				await context.HotelPhotos.AddAsync(hotelPhoto, cancellationToken);
			}

			await context.SaveChangesAsync(cancellationToken);
		}
	}

	private async Task SeedRealtorReviewsAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();

		var realtorsIds = await context.Realtors.Select(r => r.Id).ToArrayAsync(cancellationToken);
		var customersIds = await context.Customers.Select(c => c.Id).ToArrayAsync(cancellationToken);

		if (realtorsIds.Length == 0 || customersIds.Length == 0)
			return;

		for (int i = 0; i < 15; i++) {
			var realtorReview = new RealtorReview {
				Description = faker.Lorem.Sentences(3),
				Score = faker.Random.Int(1, 5),
				CreatedAtUtc = DateTime.UtcNow,
				RealtorId = faker.PickRandom(realtorsIds),
				AuthorId = faker.PickRandom(customersIds)
			};

			await context.RealtorReviews.AddAsync(realtorReview, cancellationToken);
		}

		await context.SaveChangesAsync(cancellationToken);
	}

	private async Task SeedRoomRentalPeriodsAsync(CancellationToken cancellationToken) {
		Faker faker = new Faker();

		var rooms = await context.Rooms.ToArrayAsync(cancellationToken);
		var rentalPeriodIds = await context.RentalPeriods.Select(rp => rp.Id).ToArrayAsync(cancellationToken);

		foreach (var room in rooms) {
			var randomRentalPeriodIds = faker.PickRandom(rentalPeriodIds, faker.Random.Int(1, 3));
			room.RoomRentalPeriods ??= [];

			foreach (var rentalPeriodId in randomRentalPeriodIds) {
				room.RoomRentalPeriods.Add(new RoomRentalPeriod {
					RoomId = room.Id,
					RentalPeriodId = rentalPeriodId
				});
			}
		}

		await context.SaveChangesAsync(cancellationToken);
	}

	private async Task SeedRoomTypesAsync(CancellationToken cancellationToken) {
		var faker = new Faker<RoomType>()
			.RuleFor(rt => rt.Name, faker => faker.Commerce.ProductName());

		await context.RoomTypes.AddRangeAsync(faker.Generate(5), cancellationToken);

		await context.SaveChangesAsync(cancellationToken);
	}



	private static Task<byte[]> GetImageAsBytesAsync(HttpClient httpClient, string imageUrl)
		=> httpClient.GetByteArrayAsync(imageUrl);

	private static DateTimeOffset GetRandomTimeUtc(Faker faker) {
		var ticks = faker.Date.BetweenTimeOnly(new TimeOnly(2, 0), new TimeOnly(15, 0)).ToTimeSpan().Ticks;

		return new DateTime(ticks, DateTimeKind.Utc);
	}
}
