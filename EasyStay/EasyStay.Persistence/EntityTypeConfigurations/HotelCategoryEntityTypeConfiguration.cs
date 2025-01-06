﻿using EasyStay.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Persistence.EntityTypeConfigurations;

internal class HotelCategoryEntityTypeConfiguration : IEntityTypeConfiguration<HotelCategory> {
	public void Configure(EntityTypeBuilder<HotelCategory> builder) {
		builder.ToTable("HotelCategories");

		builder.Property(hc => hc.Name)
			.HasMaxLength(255)
			.IsRequired();
	}
}