using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class RoomBookingEntityTypeConfiguration : IEntityTypeConfiguration<RoomBooking> {
	public void Configure(EntityTypeBuilder<RoomBooking> builder) {
		builder.ToTable("RoomBookings");

		builder.Property(b => b.From)
			.HasConversion(
				v => v.ToUniversalTime(),
				v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
			);

		builder.Property(b => b.To)
			.HasConversion(
				v => v.ToUniversalTime(),
				v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
			);
	}
}
