using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;

namespace WatchWebsite_TLCN.Repository
{
    public class UserOrderRepository : IUserOrder
    {
        private readonly MyDBContext _context;
        public UserOrderRepository(MyDBContext context)
        {
            _context = context;
        }
        public IEnumerable<Order> GetByUser(int userid)
        {
            var order = _context.Orders.Where(x => x.UserId == userid && x.DeliveryStatus == "received").AsQueryable();
            return order;
        }

        public IEnumerable<OrderDetailDTO> GetOrderDetails(int orderid)
        {
            var orderDetail = (from o in _context.OrderDetails
                               join p in _context.Products on o.ProductId equals p.Id
                               where o.OrderId == orderid
                               select new OrderDetailDTO
                               {
                                   OrderId = o.OrderId,
                                   ProductId = o.ProductId,
                                   ProductName = o.ProductName,
                                   Count = o.Count,
                                   Price = o.Price,
                                   Image = p.Image
                               }).ToList();

            return orderDetail;
        }
    }
}
