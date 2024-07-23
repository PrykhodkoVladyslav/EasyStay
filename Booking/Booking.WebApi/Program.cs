using AutoMapper;
using Booking.Application;
using Booking.Application.Common.Mappings;
using Booking.Application.Interfaces;
using Booking.Application.MediatR.Countries.Queries.GetPage;
using Booking.Application.MediatR.Countries.Queries.Shared;
using Booking.Domain;
using Booking.Persistence;
using Booking.WebApi.Middleware;
using Booking.WebApi.Services;
using Booking.WebApi.Services.PaginationServices;
using Microsoft.Extensions.FileProviders;
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
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddSingleton<IImageValidator, ImageValidator>();
builder.Services.AddScoped<IExistingEntityCheckerService, ExistingEntityCheckerService>();

builder.Services.AddScoped<IPaginationService<CountryVm, GetCountriesPageQuery>, CountryPaginationService>();


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
	DbInitializer.Inicialize(serviceProvider.GetRequiredService<BookingDbContext>());
}

app.Run();
