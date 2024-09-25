using Bogus;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;

namespace EasyStay.Persistence.Seeding;

public static class GeneratedDataSeeder {
	public static void Seed(IBookingDbContext context, IImageService imageService) {
		if (!context.Addresses.Any())
			SeedAddresses(context);

		if (!context.HotelCategories.Any())
			SeedHotelCategories(context);

		if (!context.Hotels.Any())
			SeedHotels(context);

		if (!context.HotelPhotos.Any())
			SeedHotelPhotos(context, imageService);

		if (!context.RealtorReviews.Any())
			SeedRealtorReviews(context);

		if (!context.HotelRentalPeriods.Any())
			SeedHotelRentalPeriods(context);
	}

	private static void SeedAddresses(IBookingDbContext context) {
		Faker faker = new Faker();
		Random random = new Random();

		var citiesId = context.Cities.Select(c => c.Id).ToList();

		for (int i = 0; i < 100; i++) {
			var cityId = faker.PickRandom(citiesId);
			var city = context.Cities.Where(c => c.Id == cityId).FirstOrDefault();

			if (city != null) {
				context.Addresses.Add(
					new() {
						Street = faker.Address.StreetName(),
						HouseNumber = faker.Address.BuildingNumber(),
						CityId = cityId,
						Latitude = city.Latitude + (random.NextDouble() * 0.01 - 0.005),
						Longitude = city.Longitude + (random.NextDouble() * 0.01 - 0.005)
					}
				);
			}
		}

		context.SaveChanges();
	}

	private static void SeedHotelCategories(IBookingDbContext context) {
		Faker faker = new Faker();
		var uniqueNames = new HashSet<string>();

		while (uniqueNames.Count < 10) {
			var newHotelTypeName = faker.Commerce.Department();

			if (uniqueNames.Add(newHotelTypeName)) {
				context.HotelCategories.Add(
					new() {
						Name = newHotelTypeName
					}
				);
			}
		}
		context.SaveChanges();
	}

	private static void SeedHotels(IBookingDbContext context) {
		Faker faker = new Faker();
		Random random = new Random();

		var addressesId = context.Addresses.Select(c => c.Id).ToList();
		var categoryIds = context.HotelCategories.Select(hc => hc.Id).ToArray();
		var userIds = context.Realtors.Select(u => u.Id).ToArray();

		foreach (var address in addressesId) {
			int numberOfRooms = random.Next(1, 21);
			double areaPerRoom = Math.Round(5 + (random.NextDouble() * 45), 2);
			double area = Math.Round(numberOfRooms * areaPerRoom, 2);

			context.Hotels.Add(
				new() {
					Name = faker.Company.CompanyName(),
					Description = faker.Lorem.Sentences(5),
					Area = area,
					NumberOfRooms = numberOfRooms,
					IsArchived = random.Next(0, 2) == 1,
					AddressId = address,
					CategoryId = faker.PickRandom(categoryIds),
					RealtorId = faker.PickRandom(userIds)
				}
			);
		}

		context.SaveChanges();
	}

	private static void SeedHotelPhotos(IBookingDbContext context, IImageService imageService) {
		Faker faker = new Faker();
		Random random = new Random();

		using var httpClient = new HttpClient();

		var hotelsId = context.Hotels.Select(c => c.Id).ToList();

		foreach (var hotel in hotelsId) {
			var photoCount = random.Next(1, 5);

			for (int i = 0; i < photoCount; i++) {
				var imageUrl = faker.Image.LoremFlickrUrl(keywords: "hotel");
				var imageBase64 = GetImageAsBase64(httpClient, imageUrl);

				context.HotelPhotos.Add(
					new() {
						Name = imageService.SaveImageAsync(imageBase64).Result,
						Priority = i,
						HotelId = hotel
					}
				);
			}
			context.SaveChanges();
		}
	}

	private static void SeedRealtorReviews(IBookingDbContext context) {
		Faker faker = new Faker();
		Random random = new Random();

		var realtorsIds = context.Realtors.Select(r => r.Id).ToArray();
		var customersIds = context.Customers.Select(c => c.Id).ToArray();

		if (realtorsIds.Any() && customersIds.Any()) {
			for (int i = 0; i < 15; i++) {
				context.RealtorReviews.Add(
					new RealtorReview {
						Description = faker.Lorem.Sentences(3),
						Score = faker.Random.Int(1, 5),
						CreatedAtUtc = DateTime.UtcNow,
						RealtorId = faker.PickRandom(realtorsIds),
						AuthorId = faker.PickRandom(customersIds)
					}
				);
			}

			context.SaveChanges();
		}
	}

	private static void SeedHotelRentalPeriods(IBookingDbContext context) {
		Faker faker = new Faker();
		var hotels = context.Hotels.ToArray();
		var rentalPeriods = context.RentalPeriods.Select(rp => rp.Id).ToArray();

		foreach (var hotel in hotels) {
			var rentalPeriodIds = faker.PickRandom(rentalPeriods, faker.Random.Int(1, 3));
			hotel.HotelRentalPeriods = [];

			foreach (var rentalPeriodId in rentalPeriodIds) {
				hotel.HotelRentalPeriods.Add(new HotelRentalPeriod {
					HotelId = hotel.Id,
					RentalPeriodId = rentalPeriodId
				});
			}
		}

		context.SaveChanges();
	}

	private static string GetImageAsBase64(HttpClient httpClient, string imageUrl) {
		var imageBytes = httpClient.GetByteArrayAsync(imageUrl).Result;
		return Convert.ToBase64String(imageBytes);
	}
}