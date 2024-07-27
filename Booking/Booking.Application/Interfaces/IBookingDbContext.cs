using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace Booking.Application.Interfaces;

public interface IBookingDbContext {
	Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	int SaveChanges();

	Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken);

	DbSet<Country> Countries { get; set; }
	DbSet<City> Cities { get; set; }
	DbSet<Address> Addresses { get; set; }
	DbSet<Hotel> Hotels { get; set; }
	DbSet<HotelType> HotelTypes { get; set; }
	DbSet<HotelPhoto> HotelPhotos { get; set; }
	//DbSet<HotelReview> HotelReviews { get; set; }
	//DbSet<HotelReviewPhoto> HotelReviewPhotos { get; set; }
	//DbSet<FavoriteHotel> FavoriteHotels { get; set; }
	//DbSet<Room> Rooms { get; set; }
	//DbSet<RoomPhoto> RoomPhotos { get; set; }
	//DbSet<Convenience> Conveniences { get; set; }
	//DbSet<RoomConvenience> RoomConveniences { get; set; }
	//DbSet<RoomBooking> RoomBookings { get; set; }
}
