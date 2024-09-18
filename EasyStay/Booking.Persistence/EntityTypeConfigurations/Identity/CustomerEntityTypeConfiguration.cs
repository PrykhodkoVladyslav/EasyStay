using Booking.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Persistence.EntityTypeConfigurations.Identity;

internal class CustomerEntityTypeConfiguration : IEntityTypeConfiguration<Customer> {
	public void Configure(EntityTypeBuilder<Customer> builder) {
		builder.ToTable("Customers");
	}
}
