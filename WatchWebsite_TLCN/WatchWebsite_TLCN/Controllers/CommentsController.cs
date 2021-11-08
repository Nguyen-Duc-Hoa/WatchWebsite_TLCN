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
using WatchWebsite_TLCN.Utilities;

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


        //reply comment
        // 
        /* POST: api/comments/replycomment/1
            {
                "UserId": 11,
                "ProductId": "aaa111",
                "Content": "Cảm ơn bạn",
                "Date":"1-11-2000",
                "TypeComment": "type",
                "ReplyFrom": null
            }
         */
        [Route("ReplyComment/{commentid}")]
        [HttpPost]
        public async Task<IActionResult> Reply(int commentid, Comment comment)
        {
            var userComment = await _unitOfWork.Comments.Get(x => x.Id == commentid);
            if(userComment != null)
            {
                comment.Date = DateTime.Now;
                int? ReplyFrom = userComment.ReplyFrom;
                if(ReplyFrom == null)
                {
                    comment.ReplyFrom = userComment.Id;
                }
                else
                {
                    comment.ReplyFrom = userComment.ReplyFrom;
                }

                try
                {
                    comment.TypeComment = Constant.typeComment[1];
                    await _unitOfWork.Comments.Insert(comment);
                    await _unitOfWork.Save();
                    return RedirectToAction(nameof(GetComments), new { productId = comment.ProductId });
                }
                catch
                {
                    return StatusCode(500);
                }
            }

            return StatusCode(500);

        }

        
        // DELETE: api/comments/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<Comment>> DeleteComment(int id)
        {
            var comment = await _unitOfWork.Comments.Get(b => b.Id == id);
            if (comment == null)
            {
                return NotFound();
            }
            else
            {
                if(comment.ReplyFrom == null)
                {
                    // Comment cha
                    //Xoa tat ca cac comment con
                    List<Comment> repComment = await _comments.GetAllRepComments(id);


                    if (repComment != null)
                    {
                        foreach(Comment item in repComment)
                        {
                            try
                            {
                                await _unitOfWork.Comments.Delete(item.Id);
                                await _unitOfWork.Save();
                            }
                            catch
                            {
                                return BadRequest("Cant not delete");
                            }
                            
                        }
                    }
                }
            }

            await _unitOfWork.Comments.Delete(id);
            await _unitOfWork.Save();

            return RedirectToAction(nameof(GetComments), new { productId = comment.ProductId });
        }


        /* PUt: api/comments?id=1&userid=8
           {
                "Id": 1,
               "UserId": 11,
               "ProductId": "aaa111",
               "Content": "Update content",
               "Date":"1-11-2000",
               "TypeComment": "type",
               "ReplyFrom": null
           }
        */
        [HttpPut]
        public async Task<IActionResult> PutComment(int id, int userid, Comment comment)
        {
            if (id != comment.Id || userid != comment.UserId)
            {
                return BadRequest();
            }

            comment.Date = DateTime.Now;
            comment.TypeComment = "Edited";
            _unitOfWork.Comments.Update(comment);

            try
            {
                await _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await CommentExists(id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToAction(nameof(GetComments), new { productId = comment.ProductId });
        }


        private Task<bool> CommentExists(int id)
        {
            return _unitOfWork.Comments.IsExist<int>(id);
        }
    }
}
