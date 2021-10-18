using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        private readonly ICartsRepository _cart;

        public CartController(ICartsRepository cart)
        {
            _cart = cart;
        }


        [HttpPost]
        [Route("AddToCart")]
        public async Task<ActionResult> AddToCart([FromBody]Cart cart)
        {
            if (_cart.AddToCart(cart))
                return Ok();
            return BadRequest("Something was wrong!");
        }


    }
}
