using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class HotelTypeEntityTypeConfiguration : IEntityTypeConfiguration<HotelType> {
	public void Configure(EntityTypeBuilder<HotelType> builder) {
		builder.ToTable("HotelTypes");

		builder.Property(ht => ht.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}