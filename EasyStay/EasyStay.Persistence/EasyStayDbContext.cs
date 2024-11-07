using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using EasyStay.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace EasyStay.Persistence;

public class EasyStayDbContext(DbContextOptions<EasyStayDbContext> options)
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
	IEasyStayDbContext {

	public DbSet<Customer> Customers { get; set; }
	public DbSet<Realtor> Realtors { get; set; }
	public DbSet<Admin> Admins { get; set; }

	public DbSet<Country> Countries { get; set; }
	public DbSet<City> Cities { get; set; }
	public DbSet<Address> Addresses { get; set; }
	public DbSet<Hotel> Hotels { get; set; }
	public DbSet<HotelCategory> HotelCategories { get; set; }
	public DbSet<HotelAmenity> HotelAmenities { get; set; }
	public DbSet<HotelHotelAmenity> HotelHotelAmenities { get; set; }
	public DbSet<Breakfast> Breakfasts { get; set; }
	public DbSet<HotelBreakfast> HotelBreakfasts { get; set; }
	public DbSet<Language> Languages { get; set; }
	public DbSet<HotelStaffLanguage> HotelStaffLanguages { get; set; }
	public DbSet<HotelPhoto> HotelPhotos { get; set; }
	public DbSet<Room> Rooms { get; set; }
	public DbSet<RoomType> RoomTypes { get; set; }
	public DbSet<RentalPeriod> RentalPeriods { get; set; }
	public DbSet<RoomRentalPeriod> RoomRentalPeriods { get; set; }
	public DbSet<RoomAmenity> RoomAmenities { get; set; }
	public DbSet<RoomRoomAmenity> RoomRoomAmenities { get; set; }
	public DbSet<RoomVariant> RoomVariants { get; set; }
	public DbSet<GuestInfo> GuestInfos { get; set; }
	public DbSet<BedInfo> BedInfos { get; set; }
	public DbSet<RealtorReview> RealtorReviews { get; set; }
	public DbSet<Chat> Chats { get; set; }
	public DbSet<Message> Messages { get; set; }
	public DbSet<Citizenship> Citizenships { get; set; }
	public DbSet<Gender> Genders { get; set; }
	public DbSet<BankCard> BankCards { get; set; }
	public DbSet<Booking> Bookings { get; set; }
	public DbSet<BookingRoomVariant> BookingRoomVariants { get; set; }
	public DbSet<BookingBedSelection> BookingBedSelections { get; set; }
	public DbSet<HotelReview> HotelReviews { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder) {
		base.OnModelCreating(modelBuilder);

		modelBuilder.ApplyConfigurationsFromAssembly(typeof(EasyStayDbContext).Assembly);
	}

	public Task<IDbContextTransaction> BeginTransactionAsync(CancellationToken cancellationToken) {
		return Database.BeginTransactionAsync(cancellationToken);
	}
}
