using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

internal class BedInfoEntityTypeConfiguration : IEntityTypeConfiguration<BedInfo> {
	public void Configure(EntityTypeBuilder<BedInfo> builder) {
		builder.ToTable("BedInfos");

		builder.HasKey(bi => bi.RoomVariantId);
	}
}
