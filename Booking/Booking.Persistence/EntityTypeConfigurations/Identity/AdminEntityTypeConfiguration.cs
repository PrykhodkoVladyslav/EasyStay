using Booking.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations.Identity;

internal class AdminEntityTypeConfiguration : IEntityTypeConfiguration<Admin> {
	public void Configure(EntityTypeBuilder<Admin> builder) {
		builder.ToTable("Admins");
	}
}
