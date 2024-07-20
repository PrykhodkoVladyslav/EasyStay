using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class HotelReviewPhotoEntityTypeConfiguration : IEntityTypeConfiguration<HotelReviewPhoto> {
	public void Configure(EntityTypeBuilder<HotelReviewPhoto> builder) {
		builder.ToTable("HotelReviewPhotos");

		builder.Property(hrp => hrp.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}