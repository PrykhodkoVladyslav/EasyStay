using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EasyStay.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class added_RentalPeriods_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Hotels_AddressId",
                table: "Hotels");

            migrationBuilder.AddColumn<long>(
                name: "RentalPeriodId",
                table: "Hotels",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "RentalPeriods",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalPeriods", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_AddressId",
                table: "Hotels",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_RentalPeriodId",
                table: "Hotels",
                column: "RentalPeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Hotels_RentalPeriods_RentalPeriodId",
                table: "Hotels",
                column: "RentalPeriodId",
                principalTable: "RentalPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hotels_RentalPeriods_RentalPeriodId",
                table: "Hotels");

            migrationBuilder.DropTable(
                name: "RentalPeriods");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_AddressId",
                table: "Hotels");

            migrationBuilder.DropIndex(
                name: "IX_Hotels_RentalPeriodId",
                table: "Hotels");

            migrationBuilder.DropColumn(
                name: "RentalPeriodId",
                table: "Hotels");

            migrationBuilder.CreateIndex(
                name: "IX_Hotels_AddressId",
                table: "Hotels",
                column: "AddressId");
        }
    }
}
