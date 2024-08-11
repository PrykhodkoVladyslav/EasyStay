using Booking.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations.Identity;

internal class RealtorEntityTypeConfiguration : IEntityTypeConfiguration<Realtor> {
	public void Configure(EntityTypeBuilder<Realtor> builder) {
		builder.ToTable("Realtors");
	}
}
