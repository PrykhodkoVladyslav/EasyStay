using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

internal class RentalPeriodTypeConfiguration : IEntityTypeConfiguration<RentalPeriod> {
	public void Configure(EntityTypeBuilder<RentalPeriod> builder) {
		builder.ToTable("RentalPeriods");

		builder.Property(rp => rp.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}
