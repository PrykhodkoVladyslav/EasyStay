using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

internal class GuestInfoEntityTypeConfiguration : IEntityTypeConfiguration<GuestInfo> {
	public void Configure(EntityTypeBuilder<GuestInfo> builder) {
		builder.ToTable("GuestInfos");

		builder.HasKey(gi => gi.RoomVariantId);
	}
}
