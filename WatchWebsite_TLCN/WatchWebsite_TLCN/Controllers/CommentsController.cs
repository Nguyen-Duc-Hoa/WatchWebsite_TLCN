using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.IRepository;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public CommentsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<IEnumerable<Comment>> GetComments()
        {
            return await _unitOfWork.Comments.GetAll(includes: new List<string> { "ReplyComments", "User" });
        }

        // POST: api/Comments/AddComment
        [Route("AddComment")]
        [HttpPost]
        public async Task<IActionResult> AddComment(Comment comment)
        {
            try
            {
                await _unitOfWork.Comments.Insert(comment);
                await _unitOfWork.Save();
                return RedirectToAction(nameof(GetComments));
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // POST: api/Comments/Reply
        [Route("Reply")]
        [HttpPost]
        public async Task<IActionResult> Reply(ReplyComment reply)
        {
            try
            {
                await _unitOfWork.ReplyComments.Insert(reply);
                await _unitOfWork.Save();
                return RedirectToAction(nameof(GetComments));
            }            
            catch
            {
                return StatusCode(500);
            }
        }

        private Task<bool> CommentExists(int id)
        {
            return _unitOfWork.Comments.IsExist<int>(id);
        }
    }
}
