using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;
using WatchWebsite_TLCN.IRepository;

namespace WatchWebsite_TLCN.Repository
{
    public class CartsRepository : ICartsRepository
    {
        private readonly MyDBContext _context;
        private readonly IMapper _mapper;

        public CartsRepository(MyDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<CartDTO> GetCart(int userId)
        {

            var cartItem = (from p in _context.Products
                            join b in _context.Brands on p.BrandId equals b.BrandId
                            join c in _context.Carts on p.Id equals c.ProductId
                            where c.UserId == userId
                            select new CartDTO()
                            {
                                Id = p.Id,
                                Name = p.Name,
                                Image = p.Image,
                                Price = p.Price,
                                Brand = b.Name,
                                Quantity = c.Count
                            }).ToList();
                              
            return cartItem;
        }

        public bool AddToCart(Cart cart)
        {
            //chua co san pham trong cart thi them san pham
            if(!ProductExists(cart))
            {
                _context.Carts.Add(cart);
                return Save();
            }
            //Co san pham trong cart thi tang so luong
            else
            {
                var cartItem = _context.Carts.Find(cart.UserId, cart.ProductId);
                if (cartItem != null)
                {
                    cart.Count += cartItem.Count;
                    //_context.Carts.Update(cart);
                    //return Save();

                    (from p in _context.Carts
                     where (p.UserId == cart.UserId) && (p.ProductId == cart.ProductId)
                     select p).ToList()
                                        .ForEach(x => x.Count = cart.Count);
                    return Save();
                }
            }
            return false;
            
        }

        public bool DecreaseQuantity(Cart cart)
        {
            //Kiem tra cart co ton tai ko
            var cart1 = _context.Carts.Where(x => x.UserId == cart.UserId && x.ProductId == cart.ProductId && x.Count == cart.Count);

            if( cart1.Count() != 1)
            {
                return false;
            }
            
            if (cart.Count == 1 )
            {
                //Xoa san pham khoi gio hang
                _context.Carts.Remove(cart);
                cart.Count = 0;
                return Save();
            }

            //So luong --1;
            cart.Count -= 1;

            _context.Carts.Update(cart);
            return Save();

/*            (from p in _context.Carts
             where (p.UserId == cart.UserId) && (p.ProductId == cart.ProductId)
             select p).ToList()
                                .ForEach(x => x.Count = cart.Count);*/


        }

        public bool DeleteFromCart(Cart cart)
        {
            _context.Carts.Remove(cart);
            return Save();
        }


        public bool IncreaseQuantity(Cart cart)
        {
            Product product = _context.Products.Where(x => x.Id == cart.ProductId).FirstOrDefault();

            //Kiem tra cart co ton tai ko
            var cart1 = _context.Carts.Where(x => x.UserId == cart.UserId && x.ProductId == cart.ProductId && x.Count == cart.Count);


            int count = cart.Count + 1;
            if(count > product.Amount || cart1.Count() != 1)
            {
                return false;
            }

            cart.Count = count;
            _context.Carts.Update(cart);

            return Save();

        }

        public bool ProductExists(Cart cart)
        {
            bool value = _context.Carts.Any(a => a.UserId == cart.UserId && a.ProductId == cart.ProductId);
            return value;
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0 ? true: false;
        }
    }
}
