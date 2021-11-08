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
            var order = _context.Orders.Where(x => x.UserId == userid && x.DeliveryStatus == "Complete").AsQueryable();
            return order;
        }

        public IEnumerable<OrderDetailDTO> GetOrderDetails(int orderid)
        {
            var orderDetail = (from o in _context.OrderDetails
                               join p in _context.Products on o.ProductId equals p.Id
                               join b in _context.Brands on p.BrandId equals b.BrandId
                               where o.OrderId == orderid
                               select new OrderDetailDTO
                               {
                                   OrderId = o.OrderId,
                                   ProductId = o.ProductId,
                                   ProductName = o.ProductName,
                                   Brand = b.Name,
                                   Count = o.Count,
                                   Price = o.Price,
                                   Image = p.Image
                               }).ToList();

            return orderDetail;
        }

        public Order UpdateStatus(int orderid, string status)
        {
            var order = _context.Orders.Where(x => x.OrderId == orderid).FirstOrDefault();
            string status1 = null;

            if (order != null)
            {
                status1 = order.DeliveryStatus.ToString();
                switch (status1)
                {
                    case "Waiting":
                        status1 = "Confirmed";
                        break;
                    case "Confirmed":
                        status1 = "Delivering";
                        break;
                    case "Delivering":
                        status1 = "Complete";
                        break;
                    case "Complete":
                        status1 = null;
                        break;
                    default:
                        status1 = null;
                        break;                       
                }

                if (status1 != status)
                    status1 = null;

                if (status1 != null)
                {
                    try
                    {
                        order.DeliveryStatus = status1;
                        _context.Orders.Update(order);

                        _context.SaveChanges();
                        
                        
                        return order;
                    }
                    catch
                    {
                        return null;
                    }
                    
                }
                
            }
            return null;

        }
    }
}
