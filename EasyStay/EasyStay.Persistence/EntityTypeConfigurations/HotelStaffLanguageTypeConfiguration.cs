using EasyStay.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

public class HotelStaffLanguageTypeConfiguration : IEntityTypeConfiguration<HotelStaffLanguage> {
	public void Configure(EntityTypeBuilder<HotelStaffLanguage> builder) {
		builder.ToTable("HotelStaffLanguages");

		builder.HasKey(hsl => new {
			hsl.HotelId,
			hsl.LanguageId
		});
	}
}
