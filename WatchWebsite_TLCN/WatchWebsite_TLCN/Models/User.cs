using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchWebsite_TLCN.Models
{
    public class User
    {

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool State { get; set; }
        public string Phone { get; set; }
        public string Birthday { get; set; }
        public byte[] Avatar { get; set; }

    }
}
