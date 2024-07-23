using AutoMapper;
using Booking.Application;
using Booking.Application.Common.Mappings;
using Booking.Application.Interfaces;
using Booking.Persistence;
using Booking.WebApi.Middleware;
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCustomExceptionHandler();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope()) {
	var serviceProvider = scope.ServiceProvider;
	DbInitializer.Inicialize(serviceProvider.GetRequiredService<BookingDbContext>());
}

app.Run();
