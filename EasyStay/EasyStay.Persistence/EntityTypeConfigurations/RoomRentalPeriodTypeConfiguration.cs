using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

public class RoomRentalPeriodTypeConfiguration : IEntityTypeConfiguration<RoomRentalPeriod> {
	public void Configure(EntityTypeBuilder<RoomRentalPeriod> builder) {
		builder.ToTable("RoomRentalPeriods");

		builder.HasKey(rrp => new {
			rrp.RoomId,
			rrp.RentalPeriodId
		});
	}
}
