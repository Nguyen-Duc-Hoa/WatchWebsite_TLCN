using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN
{
    public interface IJwtAuthenticationManager
    {
        //AuthenticationResponse Authenticate(string username, string password)
        AuthenticationResponse Authenticate(int userid, string username, string password, int role)
        {
            throw new NotImplementedException();
        }

        IDictionary<string, string> UsersRefreshTokens { get; set; }

        AuthenticationResponse Authenticate(string username, Claim[] claims);

    }
}
