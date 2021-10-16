using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchWebsite_TLCN.DTO
{
    public class ListProductDTO
    {
        public List<ProductDTO> Products { get; set; }
        public int TotalPage { get; set; }
        public int CurrentPage { get; set; }
    }
}
