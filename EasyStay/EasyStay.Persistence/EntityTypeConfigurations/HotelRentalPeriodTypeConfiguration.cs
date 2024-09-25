using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

public class HotelRentalPeriodTypeConfiguration : IEntityTypeConfiguration<HotelRentalPeriod> {
	public void Configure(EntityTypeBuilder<HotelRentalPeriod> builder) {
		builder.ToTable("HotelRentalPeriods");

		builder.HasKey(hrp => new {
			hrp.HotelId,
			hrp.RentalPeriodId
		});
	}
}
