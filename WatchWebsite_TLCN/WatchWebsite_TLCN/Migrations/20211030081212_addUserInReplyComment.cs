using Microsoft.EntityFrameworkCore.Migrations;

namespace WatchWebsite_TLCN.Migrations
{
    public partial class addUserInReplyComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ReplyComment_UserId",
                table: "ReplyComment",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReplyComment_User_UserId",
                table: "ReplyComment",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReplyComment_User_UserId",
                table: "ReplyComment");

            migrationBuilder.DropIndex(
                name: "IX_ReplyComment_UserId",
                table: "ReplyComment");
        }
    }
}
