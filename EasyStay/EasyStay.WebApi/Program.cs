using EasyStay.Application;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.Interfaces;
using EasyStay.Infrastructure.Options;
using EasyStay.Infrastructure.Services;
using EasyStay.Persistence;
using EasyStay.Persistence.Services;
using EasyStay.Services;
using EasyStay.WebApi.Extensions;
using EasyStay.WebApi.Hubs;
using EasyStay.WebApi.Middleware;
using EasyStay.WebApi.Services;
using EasyStay.WebApi.Services.PaginationServices.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(
	configAction => {
		configAction.AddProfile(new AssemblyMappingProfile(typeof(IEasyStayDbContext).Assembly));
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

builder.Services.AddTransient<IDbInicializer, DbInitializer>();
builder.Services.AddTransient<IScopeCoveredDbInicializer, ScopeCoveredDbInicializer>();
builder.Services.AddTransient<ICleanDataSeeder, CleanDataSeeder>();
builder.Services.AddTransient<IGeneratedDataSeeder, GeneratedDataSeeder>();
builder.Services.AddTransient<IAggregateSeeder, AggregateSeeder>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<ICurrentUserService, CurrentUserService>();
builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddScoped<IIdentityValidator, IdentityValidator>();
builder.Services.AddScoped<ICollectionValidator, CollectionValidator>();
builder.Services.AddSingleton<IImageValidator, ImageValidator>();
builder.Services.AddScoped<IExistingEntityCheckerService, ExistingEntityCheckerService>();
builder.Services.AddSingleton<IEmailService, GmailEmailService>();
builder.Services.AddSingleton<ITimeConverter, TimeConverter>();
builder.Services.AddSingleton<IDateConverter, DateConverter>();


builder.Services.AddPaginationServices();

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

var imageService = app.Services.GetRequiredService<IImageService>();
imageService.CreateImagesDirIfNotExists();

app.UseStaticFiles(new StaticFileOptions {
	FileProvider = new PhysicalFileProvider(imageService.ImagesDir),
	RequestPath = "/images"
});

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chat");

app.MapControllers();

await app.Services.GetRequiredService<IScopeCoveredDbInicializer>().InitializeAsync();

var seedTask = app.Services.GetRequiredService<IAggregateSeeder>().SeedAsync();
var appTask = app.RunAsync();

await seedTask;
await appTask;
