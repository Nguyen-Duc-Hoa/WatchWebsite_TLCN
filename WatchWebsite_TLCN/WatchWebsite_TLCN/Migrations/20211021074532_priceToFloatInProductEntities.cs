using Microsoft.EntityFrameworkCore.Migrations;

namespace WatchWebsite_TLCN.Migrations
{
    public partial class priceToFloatInProductEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Price",
                table: "Product",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Product",
                type: "float",
                nullable: false,
                oldClrType: typeof(float));
        }
    }
}
