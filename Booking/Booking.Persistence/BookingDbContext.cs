using Booking.Persistence.EntityTypeConfigurations.Identity;
using Booking.Persistence.EntityTypeConfigurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Booking.Domain.Identity;
using Booking.Domain;
using Booking.Application.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace Booking.Persistence;

public class BookingDbContext(DbContextOptions<BookingDbContext> options)
	: IdentityDbContext<
		User,
		Role,
		long,
		IdentityUserClaim<long>,
		UserRole,
		IdentityUserLogin<long>,
		IdentityRoleClaim<long>,
		IdentityUserToken<long>
	>(options),
	IBookingDbContext {

	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Hotel> Hotels { get; set; }
	public DbSet<HotelCategory> HotelCategories { get; set; }
	public DbSet<HotelPhoto> HotelPhotos { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		new UserEntityTypeConfiguration().Configure(modelBuilder.Entity<User>());
		new UserRoleEntityTypeConfiguration().Configure(modelBuilder.Entity<UserRole>());

		new CountryEntityTypeConfiguration().Configure(modelBuilder.Entity<Country>());
		new CityEntityTypeConfiguration().Configure(modelBuilder.Entity<City>());
		new AddressEntityTypeConfiguration().Configure(modelBuilder.Entity<Address>());
		new HotelEntityTypeConfiguration().Configure(modelBuilder.Entity<Hotel>());
		new HotelCategoryEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelCategory>());
		new HotelPhotoEntityTypeConfiguration().Configure(modelBuilder.Entity<HotelPhoto>());
	}

	public Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken) {
		return Database.BeginTransactionAsync(cancellationToken);
	}
}
