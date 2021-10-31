using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;
using WatchWebsite_TLCN.IRepository;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICommentsRepository _comments;
        private readonly IMapper _mapper;
        public CommentsController(IUnitOfWork unitOfWork, ICommentsRepository comments, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _comments = comments;
            _mapper = mapper;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<IEnumerable<CommentDTO>> GetComments(string productId)
        {
            List<Comment> result = await _comments.GetAllComments(productId);
            var commentList = _mapper.Map<List<CommentDTO>>(result);
            return commentList.Where(c => c.ReplyFrom == null).ToList();
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
                return RedirectToAction(nameof(GetComments), new { productId = comment.ProductId });
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
