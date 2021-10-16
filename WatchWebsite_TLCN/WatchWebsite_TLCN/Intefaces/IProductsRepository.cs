using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Intefaces
{
    public interface IProductsRepository
    {
        IEnumerable<Product> GetPopularProduct();
        Task<Tuple<List<Product>, Pagination>> GetFilterProduct(double[] limit, string[] brands, int gender, string sortBy, Pagination pagination);
    }
}
