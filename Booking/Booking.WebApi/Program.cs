using Booking.Application;
using Booking.Application.Common.Mappings;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Cities.Queries.GetPage;
using Booking.Application.MediatR.Cities.Queries.Shared;
using Booking.Application.MediatR.Countries.Queries.GetPage;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Application.MediatR.HotelTypes.Queries.GetPage;
using Booking.Application.MediatR.HotelTypes.Queries.Shared;
using Booking.Domain.Identity;
using Booking.Persistence;
using Booking.Persistence.Seeding;
using Booking.Services;
using Booking.WebApi.Middleware;
using Booking.WebApi.Services;
using Booking.WebApi.Services.PaginationServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using Notes.Persistence;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(
	configAction => {
		configAction.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
		configAction.AddProfile(new AssemblyMappingProfile(typeof(IBookingDbContext).Assembly));
	}
);

builder.Services.AddApplication();
builder.Services.AddPersistence(builder.Configuration);

builder.Services.AddControllers();
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
builder.Services.AddSingleton<IImageValidator, ImageValidator>();
builder.Services.AddScoped<IExistingEntityCheckerService, ExistingEntityCheckerService>();

builder.Services.AddScoped<IPaginationService<CountryVm, GetCountriesPageQuery>, CountryPaginationService>();
builder.Services.AddScoped<IPaginationService<CityVm, GetCitiesPageQuery>, CityPaginationService>();
builder.Services.AddScoped<IPaginationService<HotelTypeVm, GetHotelTypesPageQuery>, HotelTypePaginationService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
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

app.UseAuthorization();

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

	if (app.Configuration.GetValue<bool>("SeedClearData")) {
		ClearDataSeeder.Seed(context, imageService);
	}
}

app.Run();