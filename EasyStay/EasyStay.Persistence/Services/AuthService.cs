using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Application.Models.Accounts;
using EasyStay.Domain.Constants;
using EasyStay.Domain.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace EasyStay.Persistence.Services;

public class AuthService(
	IEasyStayDbContext context,
	UserManager<User> userManager,
	IConfiguration configuration,
	IImageService imageService
) : IAuthService {

	public async Task<User> CreateUserAsync(UserDto userDto, CreateUserType type, CancellationToken cancellationToken = default) {
		var user = await CreateAndInicializeUserInstanceAsync(userDto, type);

		try {
			await CreateUserAsync(user, type, userDto.Password, cancellationToken);
		}
		catch {
			imageService.DeleteImageIfExists(user.Photo);
			throw;
		}

		return user;
	}

	public async Task<User> GoogleSignInAsync(string credential, CreateUserType type, CancellationToken cancellationToken = default) {
		Payload payload = await GetPayloadAsync(credential);

		User? user = await userManager.FindByEmailAsync(payload.Email);

		user ??= await CreateGoogleUserAsync(payload, type, cancellationToken);

		return user;
	}

	private async Task<User> CreateAndInicializeUserInstanceAsync(UserDto userDto, CreateUserType type) {
		string defaultBase64Image = configuration.GetValue<string>("DefaultUserImageBase64")
			?? throw new Exception("DefaultUserImageBase64 is not inicialized");

		var user = CreateUserInstanceByType(type);

		user.FirstName = userDto.FirstName;
		user.LastName = userDto.LastName;
		user.Email = userDto.Email;
		user.UserName = userDto.UserName;
		user.Photo = await (userDto.Image is not null
			? imageService.SaveImageAsync(userDto.Image)
			: imageService.SaveImageAsync(defaultBase64Image));

		return user;
	}

	private async Task CreateUserAsync(User user, CreateUserType type, string? password = null, CancellationToken cancellationToken = default) {
		using var transaction = await context.BeginTransactionAsync(cancellationToken);

		try {
			IdentityResult identityResult = await CreateUserInDatabaseAsync(user, password);
			if (!identityResult.Succeeded)
				throw new IdentityException(identityResult, "User creating error");

			identityResult = await userManager.AddToRoleAsync(user, GetRoleByCreateUserType(type));
			if (!identityResult.Succeeded)
				throw new IdentityException(identityResult, "Role assignment error");

			await transaction.CommitAsync(cancellationToken);
		}
		catch {
			await transaction.RollbackAsync(cancellationToken);
			throw;
		}
	}

	private static User CreateUserInstanceByType(CreateUserType type) =>
		type switch {
			CreateUserType.Customer => new Customer(),
			CreateUserType.Realtor => new Realtor(),
			CreateUserType.Admin => new Admin(),
			_ => throw new Exception("Invalid option"),
		};

	private static string GetRoleByCreateUserType(CreateUserType type) =>
		type switch {
			CreateUserType.Customer => Roles.Customer,
			CreateUserType.Realtor => Roles.Realtor,
			CreateUserType.Admin => Roles.Admin,
			_ => throw new Exception("Invalid type")
		};

	private async Task<Payload> GetPayloadAsync(string credential) {
		try {
			return await ValidateAsync(
				credential,
				new ValidationSettings {
					Audience = [configuration["Authentication:Google:ClientId"]]
				}
			);
		}
		catch (InvalidJwtException e) {
			throw new UnauthorizedException(e.Message);
		}
	}

	private async Task<User> CreateGoogleUserAsync(Payload payload, CreateUserType type, CancellationToken cancellationToken = default) {
		using var httpClient = new HttpClient();

		string photo;

		try {
			var bytes = await httpClient.GetByteArrayAsync(payload.Picture, cancellationToken);
			photo = await imageService.SaveImageAsync(bytes);
		}
		catch {
			string defaultBase64Image = configuration.GetValue<string>("DefaultUserImageBase64")
						?? throw new Exception("DefaultUserImageBase64 is not inicialized");

			photo = await imageService.SaveImageAsync(defaultBase64Image);
		}

		var user = CreateUserInstanceByType(type);

		user.FirstName = payload.GivenName;
		user.LastName = payload.FamilyName;
		user.Email = payload.Email;
		user.UserName = payload.Email;
		user.Photo = photo;

		try {
			await CreateUserAsync(user, type, cancellationToken: cancellationToken);
		}
		catch {
			imageService.DeleteImageIfExists(user.Photo);
			throw;
		}

		return user;
	}

	private Task<IdentityResult> CreateUserInDatabaseAsync(User user, string? password) =>
		string.IsNullOrEmpty(password)
			? userManager.CreateAsync(user)
			: userManager.CreateAsync(user, password);
}
