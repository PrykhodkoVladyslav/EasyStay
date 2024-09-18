using EasyStay.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations.Identity;

internal class RealtorEntityTypeConfiguration : IEntityTypeConfiguration<Realtor> {
	public void Configure(EntityTypeBuilder<Realtor> builder) {
		builder.ToTable("Realtors");
	}
}
