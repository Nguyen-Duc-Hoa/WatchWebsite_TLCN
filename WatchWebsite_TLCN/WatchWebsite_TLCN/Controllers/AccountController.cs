using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WatchWebsite_TLCN.Entities;
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

        public AccountController (IJwtAuthenticationManager jwtAuthenticationManager, MyDBContext context)
        {
            _context = context;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]Register model)
        {
            //Kiem tra confirm password
            if(model.Password == model.ConfirmPass)
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
            User user = _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            if (user == null)
            {
                username = null;
                password = null;
            }
            
            var token = _jwtAuthenticationManager.Authenticate(username, password);

            if(token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
            
        }
    }
}
