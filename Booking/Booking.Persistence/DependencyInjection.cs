using Booking.Application.Interfaces;
using Booking.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Notes.Persistence;

public static class DependencyInjection {
	public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration) {
		var connectionString = configuration.GetConnectionString("Npgsql");

		services.AddDbContext<BookingDbContext>(options => {
			options.UseNpgsql(connectionString);
		});

		services.AddScoped<IBookingDbContext, BookingDbContext>();

		return services;
	}
}
