using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;
using WatchWebsite_TLCN.Models;
using WatchWebsite_TLCN.Utilities;

namespace WatchWebsite_TLCN.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly MyDBContext _context;

        public ProductsRepository(MyDBContext context)
        {
            _context = context;
        }

        public async Task<Tuple<List<Product>, Pagination>> GetFilterProduct(double[] limit, string[] brands, int gender, string sortBy, Pagination pagination)
        {
            var min = limit[0];
            var max = limit[1];

            //Filter price
            var result = await _context.Products.Where(p => p.Price > min && p.Price <= max).Include(p => p.Brand).ToListAsync();

            //Fitler gender
            if(gender != -1)
            {
                result = result.Where(r => r.Gender == gender).ToList();
            }

            //Fitler brand
            foreach(var b in brands)
            {
                result = result.Where(p => p.Brand.Name == b).ToList();
            }

            result.Skip((pagination.CurrentPage - 1) * pagination.ItemsPerPage).Take(pagination.ItemsPerPage);
            int count = result.Count;

            Pagination pagingInfo = new Pagination();
            pagingInfo.CurrentPage = pagination.CurrentPage > 0 ? pagination.CurrentPage : 1;
            pagingInfo.TotalItem = count;
            

            switch (sortBy)
            {
                case Constant.alphabetically:
                    result = result.OrderBy(p => p.Name).ToList();
                    break;
                case Constant.nonAlphabetically:
                    result = result.OrderByDescending(p => p.Name).ToList();
                    break;
                case Constant.priceAscending:
                    result = result.OrderBy(p => p.Price).ToList();
                    break;
                case Constant.priceDesending:
                    result = result.OrderByDescending(p => p.Price).ToList();
                    break;
                case Constant.bestSelling:
                    result = (from p in result
                              join c in (from orderDetails in _context.OrderDetails
                                         group orderDetails by orderDetails.ProductId into g
                                         select new CountSellProduct()
                                         {
                                             ProductId = g.Key,
                                             Count = g.Sum(x => x.Count)
                                         })
                                         on p.Id equals c.ProductId
                              orderby c.Count descending
                              select p).ToList();
                    break;
                default:
                    result = (from p in result
                              join c in (from orderDetails in _context.OrderDetails
                                         group orderDetails by orderDetails.ProductId into g
                                         select new CountSellProduct()
                                         {
                                             ProductId = g.Key,
                                             Count = g.Sum(x => x.Count)
                                         })
                                         on p.Id equals c.ProductId
                              orderby c.Count descending
                              select p).ToList();
                    break;
            }
            return new Tuple<List<Product>, Pagination>(result, pagingInfo);
        }

        public IEnumerable<Product> GetPopularProduct()
        {
            //Tinh so luong ban theo tung san pham

            var product = (from p in _context.Products
                           join c in (from orderDetails in _context.OrderDetails
                                      group orderDetails by orderDetails.ProductId into g
                                      select new CountSellProduct()
                                      {
                                          ProductId = g.Key,
                                          Count = g.Sum(x => x.Count)
                                      })
                                      on p.Id equals c.ProductId
                           orderby c.Count descending
                           select p).Take(10).ToList();

            return product;
        }
    }
}
