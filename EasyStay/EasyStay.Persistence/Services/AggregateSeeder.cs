using EasyStay.Application.Interfaces;
using EasyStay.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EasyStay.Persistence.Services;

public class AggregateSeeder(
	IServiceScopeFactory serviceScopeFactory,
	IConfiguration configuration
) : IAggregateSeeder {

	public async Task SeedAsync(CancellationToken cancellationToken = default) {
		using var scope = serviceScopeFactory.CreateScope();
		var serviceProvider = scope.ServiceProvider;

		var context = serviceProvider.GetRequiredService<EasyStayDbContext>();
		var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
		var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
		var imageService = serviceProvider.GetRequiredService<IImageService>();

		DbInitializer.Inicialize(context);
		DbInitializer.SeedIdentity(context, userManager, roleManager, configuration, imageService);

		if (configuration.GetValue<bool>("SeedCleanData"))
			await serviceProvider.GetRequiredService<ICleanDataSeeder>().SeedAsync(cancellationToken);

		if (configuration.GetValue<bool>("SeedGeneratedData"))
			await serviceProvider.GetRequiredService<IGeneratedDataSeeder>().SeedAsync(cancellationToken);

		await Console.Out.WriteLineAsync("Seedind completed");
	}
}
