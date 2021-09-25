using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchWebsite_TLCN.Entities
{
    public class MyDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User_Role> User_Roles { get; set; }
        public DbSet<Energy> Enegies { get; set; }

        public MyDBContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User_Role>().HasKey(u => new
            {
                u.UserId,
                u.RoleId
            });


            //Username is unique
            modelBuilder.Entity<User>().HasIndex(u => new { u.Username})
            .IsUnique(true);
        }


    }
}
