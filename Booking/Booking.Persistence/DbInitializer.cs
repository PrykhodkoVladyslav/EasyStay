using Booking.Application.Interfaces;
using Booking.Domain.Constants;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Booking.Persistence;

public static class DbInitializer {
	public static void Inicialize(BookingDbContext context) {
		context.Database.Migrate();
	}

	public static void SeedIdentity(IBookingDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager, IConfiguration configuration, IImageService imageService) {
		var cancellationTokenSource = new CancellationTokenSource();
		var token = cancellationTokenSource.Token;
		using var transaction = context.BeginTransactionAsync(token).Result;

		try {
			if (!roleManager.Roles.Any()) {
				CreateRolesAsync(roleManager).Wait();
			}

			if (!userManager.Users.Any()) {
				CreateAdminAsync(userManager, configuration, imageService).Wait();
			}

			transaction.Commit();
		}
		catch (Exception) {
			transaction.Rollback();
			throw;
		}
	}

	private static async Task CreateRolesAsync(RoleManager<Role> roleManager) {
		foreach (var roleName in Roles.All) {
			await roleManager.CreateAsync(new Role {
				Name = roleName
			});
		}
	}

	private static async Task CreateAdminAsync(UserManager<User> userManager, IConfiguration configuration, IImageService imageService) {
		string defaultBase64Image = configuration.GetValue<string>("DefaultUserImageBase64")
			?? throw new Exception("DefaultUserImageBase64 is not inicialized");

		var admin = new Admin {
			FirstName = "Олег",
			LastName = "Ольжич",
			Email = configuration["Admin:Email"]
				?? throw new NullReferenceException("Admin:Email"),
			UserName = "admin",
			Photo = await imageService.SaveImageAsync(defaultBase64Image)
		};

		IdentityResult result = await userManager.CreateAsync(
			admin,
			configuration["Admin:Password"]
				?? throw new NullReferenceException("Admin:Password")
		);

		if (!result.Succeeded)
			throw new Exception("Error creating admin account");

		result = await userManager.AddToRoleAsync(admin, Roles.Admin);

		if (!result.Succeeded)
			throw new Exception("Role assignment error");
	}
}
