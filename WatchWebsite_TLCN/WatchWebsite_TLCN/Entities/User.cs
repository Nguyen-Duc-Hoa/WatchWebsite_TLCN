
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WatchWebsite_TLCN.Entities
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string Name { get; set; } 
        public string Address { get; set; }
        public bool State { get; set; }
        public string Phone { get; set; }
        public string Birthday { get; set; }
        public byte[] Avatar { get; set; }

    }
}
