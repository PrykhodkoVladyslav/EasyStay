using EasyStay.Application.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace EasyStay.Persistence.Services;

public class ScopeCoveredDbInicializer(
	IServiceScopeFactory serviceScopeFactory
) : IScopeCoveredDbInicializer {

	public async Task InitializeAsync(CancellationToken cancellationToken = default) {
		using var scope = serviceScopeFactory.CreateScope();
		var serviceProvider = scope.ServiceProvider;

		await serviceProvider.GetRequiredService<IDbInicializer>().InitializeAsync(cancellationToken);
	}
}
