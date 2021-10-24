using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.IRepository;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        // GET: api/User/GetEmployeeList
        [HttpGet]
        [Route("GetEmployeeList")]
        public async Task<ActionResult<IEnumerable<User>>> GetEmployeeList(int currentPage)
        {
            try
            {
                var result = await _unitOfWork.UserRole.GetAllWithPagination(
                    expression: ur => ur.Role.RoleName == "Employee",
                    includes: new List<string> { "User", "Role"},
                    pagination: new Pagination { CurrentPage = currentPage });

                List<User> employeeList = new List<User>();
                foreach(var user in result.Item1)
                {
                    employeeList.Add(user.User);
                }

                var employeeListDTO = _mapper.Map<List<UserDTO>>(employeeList);
                return Ok(new { 
                    Users = employeeListDTO,
                    CurrentPage = result.Item2.CurrentPage,
                    TotalPage = result.Item2.TotalPage
                });
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _unitOfWork.Users.Get(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _unitOfWork.Users.Update(user);

            try
            {
                await _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await UserExists(user.Id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            await _unitOfWork.Users.Insert(user);
            await _unitOfWork.Save();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _unitOfWork.Users.Get(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            await _unitOfWork.Users.Delete(user);
            await _unitOfWork.Save();

            return user;
        }

        private Task<bool> UserExists(int id)
        {
            return _unitOfWork.Users.IsExist<int>(id);
        }
    }
}
