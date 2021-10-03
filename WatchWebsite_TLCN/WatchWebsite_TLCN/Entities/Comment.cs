﻿
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace WatchWebsite_TLCN.Entities
{
    [Table("Comment")]

    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string ProductId { get; set; }

        [Required]
        public string Content { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        public virtual ICollection<ReplyComment> ReplyComments { get; set; }
    }
}
