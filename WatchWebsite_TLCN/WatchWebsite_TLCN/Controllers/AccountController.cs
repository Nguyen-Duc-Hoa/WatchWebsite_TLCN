using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Methods;
using WatchWebsite_TLCN.Models;
using WatchWebsite_TLCN.Utilities;

namespace WatchWebsite_TLCN.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IJwtAuthenticationManager _jwtAuthenticationManager;

        public AccountController(IJwtAuthenticationManager jwtAuthenticationManager, MyDBContext context)
        {
            _context = context;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        //POST: api/account/register
        /*JSON
            {
                "Username":"username",
                "Email": "abc@gmail.com",
                "Phone": "123456789",
                "Password": "123",
                "ConfirmPass": "123"
            }

         */
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            string rolename = Constant.customerRole;

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

                        //them User_Role
                        if(AddUser_Role(rolename, model.Username))
                            return Ok();
                        return BadRequest("Role user have trouble");
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


        //post: api/account/login   {"Username": "Hoa", "Password":"123"} 
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            string username = model.Username;
            string password = model.Password;
            int userid = 0;

            List<string> listRole = new List<string>();
            List<int> listRoleId = new List<int>();

            User user = _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            


            if (user == null)
            {
                username = null;
                password = null;
            }
            else
            {
                if (user.State is false)
                {
                    return BadRequest("UnAuthorize");
                }

                userid = user.Id;
                var user_role = (from u in _context.User_Roles
                                 join r in _context.Roles on u.RoleId equals r.RoleId
                                 where u.UserId == userid
                                 select new
                                 {
                                     r.RoleId,
                                     r.RoleName
                                 }).ToList();

                foreach (var item in user_role)
                {
                    listRole.Add(item.RoleName);
                    listRoleId.Add(item.RoleId);
                }

            }

            //var token = _jwtAuthenticationManager.Authenticate(username, password);

            var token = _jwtAuthenticationManager.Authenticate(userid, username, password, listRoleId);

            if (token == null)
            {
                return Unauthorized();
            }

            string avatar = null;
            try
            {
                avatar = Convert.ToBase64String(user.Avatar);
            }
            catch { }

            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Name = user.Name,
                Address = user.Address,
                Phone = user.Phone,
                Birthday = user.Birthday,
                Avatar = avatar,
                Role = listRole,
                Token = token.JwtToken
            });

        }


        //post: api/account/resetpassword?email=abc@gmail.com
        [AllowAnonymous]
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string email)
        {

            // query id tu email va password de kiem tra dang nhap

            var user = _context.Users.Where(x => x.Email == email).FirstOrDefault();

            if (user != null && user.State is true)
            {

                string web_email = "laptrinhwebnhom9@gmail.com";
                // Cau hinh thong tin gmail
                var mail = new SmtpClient("smtp.gmail.com", 25)
                {
                    Credentials = new NetworkCredential(web_email, "123asd456qwe"),
                    EnableSsl = true
                };
                // tao gmail
                var message = new MailMessage();
                message.From = new MailAddress(web_email);
                message.ReplyToList.Add(web_email);
                message.To.Add(new MailAddress(email));

                // Create a random 6-digits number for verification code
                Random random = new Random();
                int code = random.Next(100000, 999999);


                message.Subject = "Reset Watch-Website Password";
                message.Body = code + " is your account password.";

                try
                {
                    // gui gmail    
                    mail.Send(message);

                    //Update Password
                    (from p in _context.Users
                     where (p.Email == email)
                     select p).ToList()
                                        .ForEach(x => x.Password = code.ToString());

                    _context.SaveChanges();

                    return Ok("Check your email");
                }
                catch (Exception e)
                {
                    return BadRequest(e.ToString());
                }

            }
            else
            {
                return NotFound();
            }

        }


        public bool AddUser_Role(string rolename, string username)
        {

            User_Role user_Role = new User_Role();
            var user = _context.Users.Where(x => x.Username == username).FirstOrDefault();
            if(user == null)
            {
                return false;
            }

            user_Role.UserId = user.Id;

            int roleid = 0;
            if (rolename == Constant.customerRole || rolename == Constant.employeeRole || rolename == Constant.adminRole)
            {
                roleid = GetRoleId(rolename);
            }
            
            // ton tai 
            if (roleid!=0)
            {
                user_Role.RoleId = roleid;

                try
                {
                    //Save User_Role
                    _context.User_Roles.Add(user_Role);
                    _context.SaveChanges();
                        
                    return true;
                }
                catch
                {
                }
                    
            }
            
            return false;
        }

        //get role id 
        public int GetRoleId(string rolename)
        {
            var role = _context.Roles.Where(x => x.RoleName == rolename).FirstOrDefault();
            if (role != null)
                return role.RoleId;
            return 0;
        }
    }
}
