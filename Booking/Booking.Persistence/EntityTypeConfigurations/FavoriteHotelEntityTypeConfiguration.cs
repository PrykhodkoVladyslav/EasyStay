using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class FavoriteHotelEntityTypeConfiguration : IEntityTypeConfiguration<FavoriteHotel> {
	public void Configure(EntityTypeBuilder<FavoriteHotel> builder) {
		builder.ToTable("FavoriteHotels");

		builder.HasKey(fh => new {
			fh.HotelId,
			fh.UserId
		});
	}
}