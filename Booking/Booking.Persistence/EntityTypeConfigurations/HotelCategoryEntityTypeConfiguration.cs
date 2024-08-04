using Booking.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations;

internal class HotelCategoryEntityTypeConfiguration : IEntityTypeConfiguration<HotelCategory> {
	public void Configure(EntityTypeBuilder<HotelCategory> builder) {
		builder.ToTable("HotelCategories");

		builder.Property(hc => hc.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}