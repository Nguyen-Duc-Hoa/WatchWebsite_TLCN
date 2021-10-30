using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN.Repository
{
    public class CommentsRepository
    {
        private readonly MyDBContext _context;
        public CommentsRepository(MyDBContext context) => _context = context;
        //public async Task<List<Comment>> GetComments()
        //{
        //    return _context.Comments.Include(c => c.User).Include(c => c.ReplyComments).ThenInclude(r => r.UserId);
        //}
    }
}
