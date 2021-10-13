using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly MyDBContext _context;

        public ProductsRepository(MyDBContext context)
        {
            _context = context;
        }

        public List<Product> GetPopularProduct()
        {
            //Tinh so luong ban theo tung san pham
            var countProduct = from orderDetails in _context.OrderDetails
                               group orderDetails by orderDetails.ProductId into g
                               select new CountSellProduct()
                               {
                                   ProductId = g.First().ProductId,
                                   Count = g.Sum(x => x.Count)
                               };

            var product = from p in _context.Products
                          join c in countProduct on p.Id equals c.ProductId
                          orderby c.Count descending
                          select p;


            return product.ToList();
        }
    }
}
