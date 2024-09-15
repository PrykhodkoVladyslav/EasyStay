using Booking.Application.Interfaces;
using Booking.Domain;
using Booking.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
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

	public DbSet<Customer> Customers { get; set; }
	public DbSet<Realtor> Realtors { get; set; }
	public DbSet<Admin> Admins { get; set; }

	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Hotel> Hotels { get; set; }
	public DbSet<HotelCategory> HotelCategories { get; set; }
	public DbSet<HotelPhoto> HotelPhotos { get; set; }
	public DbSet<RealtorReview> RealtorReviews { get; set; }
	public DbSet<Chat> Chats { get; set; }
	public DbSet<Message> Messages { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		modelBuilder.ApplyConfigurationsFromAssembly(typeof(BookingDbContext).Assembly);
	}

	public Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken) {
		return Database.BeginTransactionAsync(cancellationToken);
	}
}
