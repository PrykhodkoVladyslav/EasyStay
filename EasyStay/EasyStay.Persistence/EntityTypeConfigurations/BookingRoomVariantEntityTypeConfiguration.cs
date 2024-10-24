using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

internal class BookingRoomVariantEntityTypeConfiguration : IEntityTypeConfiguration<BookingRoomVariant> {
	public void Configure(EntityTypeBuilder<BookingRoomVariant> builder) {
		builder.ToTable("BookingRoomVariants");
	}
}
