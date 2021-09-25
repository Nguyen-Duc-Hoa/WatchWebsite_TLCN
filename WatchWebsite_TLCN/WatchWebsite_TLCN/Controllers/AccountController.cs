using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly MyDBContext _context;

        public AccountController (MyDBContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {

            var user = new User { Username = model.Username, Password = model.Password, State= true };
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
                    return BadRequest();
                }
            }
            catch
            {
                return BadRequest();
            }
            

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] RegisterViewModel model)
        {
            User user = _context.Users.Where(x => x.Username == model.Username).FirstOrDefault();
            if(user != null && user.Password == model.Password)
            {
                return Ok();
            }
            return BadRequest("Dang nhap khong thanh cong");
        }
    }
}
