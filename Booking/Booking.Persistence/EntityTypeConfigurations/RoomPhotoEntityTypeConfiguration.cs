using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class RoomPhotoEntityTypeConfiguration : IEntityTypeConfiguration<RoomPhoto> {
	public void Configure(EntityTypeBuilder<RoomPhoto> builder) {
		builder.ToTable("RoomPhotos");

		builder.Property(rp => rp.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}
