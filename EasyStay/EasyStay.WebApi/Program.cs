using EasyStay.Application;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Accounts.Queries.GetCustomerPage;
using EasyStay.Application.MediatR.Accounts.Queries.GetRealtorPage;
using EasyStay.Application.MediatR.Breakfasts.Queries.GetPage;
using EasyStay.Application.MediatR.Breakfasts.Queries.Shared;
using EasyStay.Application.MediatR.Cities.Queries.GetPage;
using EasyStay.Application.MediatR.Cities.Queries.Shared;
using EasyStay.Application.MediatR.Countries.Queries.GetPage;
using EasyStay.Application.MediatR.Countries.Queries.Shared;
using EasyStay.Application.MediatR.HotelAmenities.Queries.GetPage;
using EasyStay.Application.MediatR.HotelAmenities.Queries.Shared;
using EasyStay.Application.MediatR.HotelCategories.Queries.GetPage;
using EasyStay.Application.MediatR.HotelCategories.Queries.Shared;
using EasyStay.Application.MediatR.Hotels.Queries.GetPage;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.MediatR.RealtorReviews.Queries.GetPage;
using EasyStay.Application.MediatR.RealtorReviews.Queries.Shared;
using EasyStay.Application.MediatR.RentalPeriods.Queries.GetPage;
using EasyStay.Application.MediatR.RentalPeriods.Queries.Shared;
using EasyStay.Domain;
using EasyStay.Infrastructure.Options;
using EasyStay.Infrastructure.Services;
using EasyStay.Persistence;
using EasyStay.Persistence.Services;
using EasyStay.Services;
using EasyStay.WebApi.Extensions;
using EasyStay.WebApi.Hubs;
using EasyStay.WebApi.Middleware;
using EasyStay.WebApi.Services;
using EasyStay.WebApi.Services.PaginationServices;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(
	configAction => {
		configAction.AddProfile(new AssemblyMappingProfile(typeof(IEasyStayDbContext).Assembly));
	}
);

builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddSignalR();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
	options.AddSecurityDefinition(
		"Bearer",
		new OpenApiSecurityScheme {
			Description = "Jwt Auth header using the Bearer scheme",
			Type = SecuritySchemeType.Http,
			Scheme = "bearer"
		}
	);
	options.AddSecurityRequirement(new OpenApiSecurityRequirement {
		{
			new OpenApiSecurityScheme {
				Reference = new OpenApiReference {
					Id = "Bearer",
					Type = ReferenceType.SecurityScheme
				}
			},
			new List<string>()
		}
	});
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<ICleanDataSeeder, CleanDataSeeder>();
builder.Services.AddTransient<IGeneratedDataSeeder, GeneratedDataSeeder>();
builder.Services.AddTransient<IAggregateSeeder, AggregateSeeder>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddScoped<IIdentityValidator, IdentityValidator>();
builder.Services.AddScoped<ICollectionValidator, CollectionValidator>();
builder.Services.AddSingleton<IImageValidator, ImageValidator>();
builder.Services.AddScoped<IExistingEntityCheckerService, ExistingEntityCheckerService>();
builder.Services.AddSingleton<IEmailService, GmailEmailService>();

builder.Services.AddScoped<IPaginationService<CountryVm, GetCountriesPageQuery>, CountryPaginationService>();
builder.Services.AddScoped<IPaginationService<CityVm, GetCitiesPageQuery>, CityPaginationService>();
builder.Services.AddScoped<IPaginationService<HotelCategoryVm, GetHotelCategoriesPageQuery>, HotelCategoryPaginationService>();
builder.Services.AddScoped<IPaginationService<RentalPeriodVm, GetRentalPeriodsPageQuery>, RentalPeriodPaginationService>();
builder.Services.AddScoped<IPaginationService<HotelAmenityVm, GetHotelAmenitiesPageQuery>, HotelAmenityPaginationService>();
builder.Services.AddScoped<IPaginationService<BreakfastVm, GetBreakfastsPageQuery>, BreakfastPaginationService>();
builder.Services.AddScoped<IPaginationService<HotelVm, GetHotelsPageQuery>, HotelPaginationService>();
builder.Services.AddScoped<IPaginationService<CustomerItemVm, GetCustomerPageCommand>, CustomerPaginationService>();
builder.Services.AddScoped<IPaginationService<RealtorItemVm, GetRealtorPageCommand>, RealtorPaginationService>();
builder.Services.AddScoped<IPaginationService<RealtorReviewVm, GetRealtorReviewsPageQuery>, RealtorReviewPaginationService>();


builder.Services.Configure<GmailSmtpOptions>(builder.Configuration.GetRequiredSection("GmailSmtp"));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsDocker()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCustomExceptionHandler();

app.UseCors(
	configuration => configuration
		.AllowAnyOrigin()
		.AllowAnyHeader()
		.AllowAnyMethod()
);

var imageService = app.Services.GetRequiredService<IImageService>();
imageService.CreateImagesDirIfNotExists();

app.UseStaticFiles(new StaticFileOptions {
	FileProvider = new PhysicalFileProvider(imageService.ImagesDir),
	RequestPath = "/images"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chat");

app.MapControllers();


var seedTask = app.Services.GetRequiredService<IAggregateSeeder>().SeedAsync();
var appTask = app.RunAsync();

await seedTask;
await appTask;
