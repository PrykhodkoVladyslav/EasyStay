using EasyStay.Application;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.Accounts.Queries.GetCustomerPage;
using EasyStay.Application.MediatR.Accounts.Queries.GetRealtorPage;
using EasyStay.Application.MediatR.Cities.Queries.GetPage;
using EasyStay.Application.MediatR.Cities.Queries.Shared;
using EasyStay.Application.MediatR.Countries.Queries.GetPage;
using EasyStay.Application.MediatR.Countries.Queries.Shared;
using EasyStay.Application.MediatR.HotelCategories.Queries.GetPage;
using EasyStay.Application.MediatR.HotelCategories.Queries.Shared;
using EasyStay.Application.MediatR.Hotels.Queries.GetPage;
using EasyStay.Application.MediatR.Hotels.Queries.Shared;
using EasyStay.Application.MediatR.RealtorReviews.Queries.GetPage;
using EasyStay.Application.MediatR.RealtorReviews.Queries.Shared;
using EasyStay.Application.MediatR.RentalPeriods.Queries.GetPage;
using EasyStay.Application.MediatR.RentalPeriods.Queries.Shared;
using EasyStay.Domain.Identity;
using EasyStay.Infrastructure.Options;
using EasyStay.Infrastructure.Services;
using EasyStay.Persistence;
using EasyStay.Persistence.Seeding;
using EasyStay.Persistence.Services;
using EasyStay.Services;
using EasyStay.WebApi.Extensions;
using EasyStay.WebApi.Hubs;
using EasyStay.WebApi.Middleware;
using EasyStay.WebApi.Services;
using EasyStay.WebApi.Services.PaginationServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(
	configAction => {
		configAction.AddProfile(new AssemblyMappingProfile(typeof(IBookingDbContext).Assembly));
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

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddScoped<IIdentityValidator, IdentityValidator>();
builder.Services.AddSingleton<IImageValidator, ImageValidator>();
builder.Services.AddScoped<IExistingEntityCheckerService, ExistingEntityCheckerService>();
builder.Services.AddSingleton<IEmailService, GmailEmailService>();

builder.Services.AddScoped<IPaginationService<CountryVm, GetCountriesPageQuery>, CountryPaginationService>();
builder.Services.AddScoped<IPaginationService<CityVm, GetCitiesPageQuery>, CityPaginationService>();
builder.Services.AddScoped<IPaginationService<RentalPeriodVm, GetRentalPeriodsPageQuery>, RentalPeriodPaginationService>();
builder.Services.AddScoped<IPaginationService<HotelCategoryVm, GetHotelCategoriesPageQuery>, HotelCategoryPaginationService>();
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

string imagesDirPath = app.Services.GetRequiredService<IImageService>().ImagesDir;

if (!Directory.Exists(imagesDirPath)) {
	Directory.CreateDirectory(imagesDirPath);
}

app.UseStaticFiles(new StaticFileOptions {
	FileProvider = new PhysicalFileProvider(imagesDirPath),
	RequestPath = "/images"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chat");

app.MapControllers();

using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
	var serviceProvider = scope.ServiceProvider;
	var context = serviceProvider.GetRequiredService<BookingDbContext>();
	var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
	var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
	var configuration = serviceProvider.GetRequiredService<IConfiguration>();
	var imageService = serviceProvider.GetRequiredService<IImageService>();

	DbInitializer.Inicialize(context);
	DbInitializer.SeedIdentity(context, userManager, roleManager, configuration, imageService);

	if (app.Configuration.GetValue<bool>("SeedCleanData"))
		CleanDataSeeder.Seed(context, imageService, userManager);

	if (app.Configuration.GetValue<bool>("SeedGeneratedData"))
		GeneratedDataSeeder.Seed(context, imageService);
}

app.Run();
