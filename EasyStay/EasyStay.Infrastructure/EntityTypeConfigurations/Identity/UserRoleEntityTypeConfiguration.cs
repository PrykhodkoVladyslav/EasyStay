﻿using EasyStay.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EasyStay.Infrastructure.EntityTypeConfigurations.Identity;

internal class UserRoleEntityTypeConfiguration : IEntityTypeConfiguration<UserRole> {
	public void Configure(EntityTypeBuilder<UserRole> builder) {
		builder.HasKey(ur => new { ur.UserId, ur.RoleId });

		builder.HasOne(ur => ur.User)
			.WithMany(u => u.UserRoles)
			.HasForeignKey(ur => ur.UserId)
			.IsRequired();

		builder.HasOne(ur => ur.Role)
			.WithMany(r => r.UserRoles)
			.HasForeignKey(ur => ur.RoleId)
			.IsRequired();
	}
}