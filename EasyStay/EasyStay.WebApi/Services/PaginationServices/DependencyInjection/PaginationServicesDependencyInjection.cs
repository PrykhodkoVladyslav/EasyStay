using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Accounts.Queries.GetCustomerPage;
using EasyStay.Application.MediatR.Accounts.Queries.GetRealtorPage;
using EasyStay.Application.MediatR.Bookings.Queries.GetPage;
using EasyStay.Application.MediatR.Breakfasts.Queries.GetPage;
using EasyStay.Application.MediatR.Breakfasts.Queries.Shared;
using EasyStay.Application.MediatR.Cities.Queries.GetAdvertisingPage;
using EasyStay.Application.MediatR.Cities.Queries.GetPage;
using EasyStay.Application.MediatR.Cities.Queries.Shared;
using EasyStay.Application.MediatR.Citizenships.Queries.GetPage;
using EasyStay.Application.MediatR.Citizenships.Queries.Shared;
using EasyStay.Application.MediatR.Countries.Queries.GetPage;
using EasyStay.Application.MediatR.Countries.Queries.Shared;
using EasyStay.Application.MediatR.HotelAmenities.Queries.GetPage;
using EasyStay.Application.MediatR.HotelAmenities.Queries.Shared;
using EasyStay.Application.MediatR.HotelCategories.Queries.GetPage;
using EasyStay.Application.MediatR.HotelCategories.Queries.Shared;
using EasyStay.Application.MediatR.HotelReviews.Queries.GetPage;
using EasyStay.Application.MediatR.HotelReviews.Queries.Shared;
using EasyStay.Application.MediatR.Hotels.Queries.GetPage;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.MediatR.Languages.Queries.GetPage;
using EasyStay.Application.MediatR.Languages.Queries.Shared;
using EasyStay.Application.MediatR.RealtorReviews.Queries.GetPage;
using EasyStay.Application.MediatR.RealtorReviews.Queries.Shared;
using EasyStay.Application.MediatR.RentalPeriods.Queries.GetPage;
using EasyStay.Application.MediatR.RentalPeriods.Queries.Shared;
using EasyStay.Application.MediatR.RoomAmenities.Queries.GetPage;
using EasyStay.Application.MediatR.RoomAmenities.Queries.Shared;
using EasyStay.Application.MediatR.Rooms.Queries.GetPage;
using EasyStay.Application.MediatR.Rooms.Queries.Shared;
using EasyStay.Application.MediatR.RoomTypes.Queries.GetPage;
using EasyStay.Application.MediatR.RoomTypes.Queries.Shared;

namespace EasyStay.WebApi.Services.PaginationServices.DependencyInjection;

public static class PaginationServicesDependencyInjection {
	public static IServiceCollection AddPaginationServices(this IServiceCollection services) {
		services.AddScoped<IPaginationService<CountryVm, GetCountriesPageQuery>, CountryPaginationService>();
		services.AddScoped<IPaginationService<CityVm, GetCitiesPageQuery>, CityPaginationService>();
		services.AddScoped<IPaginationService<CityAdvertisingVm, GetCitiesAdvertisingPageQuery>, CityAdvertisingPaginationService>();
		services.AddScoped<IPaginationService<HotelCategoryVm, GetHotelCategoriesPageQuery>, HotelCategoryPaginationService>();
		services.AddScoped<IPaginationService<HotelAmenityVm, GetHotelAmenitiesPageQuery>, HotelAmenityPaginationService>();
		services.AddScoped<IPaginationService<BreakfastVm, GetBreakfastsPageQuery>, BreakfastPaginationService>();
		services.AddScoped<IPaginationService<LanguageVm, GetLanguagesPageQuery>, LanguagePaginationService>();
		services.AddScoped<IPaginationService<HotelVm, GetHotelsPageQuery>, HotelPaginationService>();
		services.AddScoped<IPaginationService<RoomVm, GetRoomsPageQuery>, RoomPaginationService>();
		services.AddScoped<IPaginationService<RentalPeriodVm, GetRentalPeriodsPageQuery>, RentalPeriodPaginationService>();
		services.AddScoped<IPaginationService<RoomTypeVm, GetRoomTypesPageQuery>, RoomTypePaginationService>();
		services.AddScoped<IPaginationService<RoomAmenityVm, GetRoomAmenitiesPageQuery>, RoomAmenityPaginationService>();
		services.AddScoped<IPaginationService<CustomerItemVm, GetCustomerPageCommand>, CustomerPaginationService>();
		services.AddScoped<IPaginationService<RealtorItemVm, GetRealtorPageCommand>, RealtorPaginationService>();
		services.AddScoped<IPaginationService<RealtorReviewVm, GetRealtorReviewsPageQuery>, RealtorReviewPaginationService>();
		services.AddScoped<IPaginationService<CitizenshipVm, GetCitizenshipsPageQuery>, CitizenshipPaginationService>();
		services.AddScoped<IPaginationService<HotelReviewVm, GetHotelReviewsPageQuery>, HotelReviewPaginationService>();
		services.AddScoped<IPaginationService<BookingVm, GetBookingsPageQuery>, BookingPaginationService>();

		return services;
	}
}
