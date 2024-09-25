namespace EasyStay.Application.Interfaces;

public interface ICleanDataSeeder {
	Task SeedAsync(CancellationToken cancellationToken = default);
}
