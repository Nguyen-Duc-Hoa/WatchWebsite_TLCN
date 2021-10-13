using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN
{
    public interface IJwtAuthenticationManager
    {
        public string Authenticate(string username, string password)
        {
            throw new NotImplementedException();
        }
        
    }
}
