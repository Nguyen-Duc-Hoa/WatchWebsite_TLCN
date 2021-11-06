using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN
{
    public class JwtAuthenticationManager : IJwtAuthenticationManager
    {
        //private readonly MyDBContext _context;
        //private readonly IRefreshTokenGenerator refreshTokenGenerator;
        //public IDictionary<string, string> UsersRefreshTokens = new Dictionary<string, string>();
        
        public readonly string tokenKey;

        public IDictionary<string, string> UsersRefreshTokens { get; set; }

        //tokenKey is private key to encode
        public JwtAuthenticationManager(string tokenKey, IRefreshTokenGenerator refreshTokenGenerator)
        {
            this.tokenKey = tokenKey;
            UsersRefreshTokens = new Dictionary<string, string>();

            //this.refreshTokenGenerator = refreshTokenGenerator;
            //_context = context;
        }


        /*public AuthenticationResponse Authenticate(string username, Claim[] claims)
        {
            var key = Encoding.ASCII.GetBytes(tokenKey);

            var jwtSecurityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature)
                );

            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            var refreshToken = refreshTokenGenerator.GeneratorToken();

            if (UsersRefreshTokens.ContainsKey(username))
            {
                UsersRefreshTokens[username] = refreshToken;
            }
            else
            {
                UsersRefreshTokens.Add(username, refreshToken);
            }

            //return tokenHandler.WriteToken(token);

            return new AuthenticationResponse
            {
                JwtToken = token,
                *//*RefreshToken = refreshToken*//*
            };
        }
*/
        public AuthenticationResponse Authenticate(int userid, string username, string password, List<int> role)
        {
            
            if(username == null || password == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            //Tạo khóa riêng tư để encode
            var key = Encoding.ASCII.GetBytes(tokenKey);

            //Mô tả mã thông báo
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.NameIdentifier, userid.ToString()),
                    new Claim(ClaimTypes.Name, username),
                }),
                
                Expires = DateTime.UtcNow.AddHours(1),
                
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            //var refreshToken = refreshTokenGenerator.GeneratorToken();

            /*if (UsersRefreshTokens.ContainsKey(username))
            {
                UsersRefreshTokens[username] = refreshToken;
            }
            else
            {
                UsersRefreshTokens.Add(username, refreshToken);
            }*/

            //return tokenHandler.WriteToken(token);

            return new AuthenticationResponse
            {
                JwtToken = tokenHandler.WriteToken(token),
                //RefreshToken = refreshToken
            };
        }


    }
}
