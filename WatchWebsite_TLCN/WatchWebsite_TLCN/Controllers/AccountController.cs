using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Methods;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;
        private readonly ITokenRefresher _tokenRefresher;

        public AccountController(IJwtAuthenticationManager jwtAuthenticationManager, ITokenRefresher tokenRefresher, MyDBContext context)
        {
            _context = context;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _tokenRefresher = tokenRefresher;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            //Kiem tra confirm password
            if (model.Password == model.ConfirmPass)
            {
                var user = new User { Username = model.Username, Password = model.Password, Phone = model.Phone, Email = model.Email, State = true };
                try
                {
                    _context.Users.Add(user);
                    var result = await _context.SaveChangesAsync();


                    if (result.Equals(1))
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Dang ki khong thanh cong");
                    }
                }
                catch
                {
                    return BadRequest();
                }

            }

            return BadRequest("Xac nhan mat khau sai!");



        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            string username = model.Username;
            string password = model.Password;
            int userid = 0;
            int role = 0;

            User user = _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            if (user == null)
            {
                username = null;
                password = null;
            }
            else
            {
                userid = user.Id;
                var user_role = _context.User_Roles.Where(x => x.UserId == userid).FirstOrDefault();

                //role = user_role.RoleId;

                role = 1;
            }

            //var token = _jwtAuthenticationManager.Authenticate(username, password);

            var token = _jwtAuthenticationManager.Authenticate(userid, username, password, role);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);

        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Refresh")]
        public IActionResult Refresh([FromBody] RefreshCred refreshCred)
        {
            var token = _tokenRefresher.Refresh(refreshCred);

            if(token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
