using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        //private readonly MyDBContext _context;
        public readonly string key;
        
        public JwtAuthenticationManager(string key /*, MyDBContext context*/)
        {
            this.key = key;
            //_context = context;
        }
        
        public string Authenticate(string username, string password)
        {
            
            /*User user = Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            if(user == null)
            {
                return null;
            }*/
            if(username == null || password == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
