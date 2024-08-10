using Booking.Domain;
using Booking.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace Booking.Application.Interfaces;

public interface IBookingDbContext {
	Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	int SaveChanges();

	Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken);

	DbSet<User> Users { get; set; }
	DbSet<Customer> Customers { get; set; }
	DbSet<Realtor> Realtors { get; set; }
	DbSet<Admin> Admins { get; set; }
	DbSet<Role> Roles { get; set; }

	DbSet<Country> Countries { get; set; }
	DbSet<City> Cities { get; set; }
	DbSet<Address> Addresses { get; set; }
	DbSet<Hotel> Hotels { get; set; }
	DbSet<HotelCategory> HotelCategories { get; set; }
	DbSet<HotelPhoto> HotelPhotos { get; set; }
	DbSet<RealtorReview> RealtorReviews { get; set; }
}
