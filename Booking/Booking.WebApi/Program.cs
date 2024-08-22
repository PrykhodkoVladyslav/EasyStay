using Booking.Application;
using Booking.Application.Common.Mappings;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Accounts.Queries.GetCustomerPage;
using Booking.Application.MediatR.Accounts.Queries.GetRealtorPage;
using Booking.Application.MediatR.Cities.Queries.GetPage;
using Booking.Application.MediatR.Cities.Queries.Shared;
using Booking.Application.MediatR.Countries.Queries.GetPage;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.MediatR.HotelCategories.Queries.GetPage;
using Booking.Application.MediatR.HotelCategories.Queries.Shared;
using Booking.Application.MediatR.Hotels.Queries.GetPage;
using Booking.Application.MediatR.Hotels.Queries.Shared;
using Booking.Application.MediatR.RealtorReviews.Queries.GetPage;
using Booking.Application.MediatR.RealtorReviews.Queries.Shared;
using Booking.Domain.Identity;
using Booking.Infrastructure.Options;
using Booking.Infrastructure.Services;
using Booking.Persistence;
using Booking.Persistence.Seeding;
using Booking.Services;
using Booking.WebApi.Extensions;
using Booking.WebApi.Hubs;
using Booking.WebApi.Middleware;
using Booking.WebApi.Services;
using Booking.WebApi.Services.PaginationServices;
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
