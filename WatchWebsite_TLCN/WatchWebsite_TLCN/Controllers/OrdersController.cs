using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.IRepository;
using Newtonsoft.Json;
using WatchWebsite_TLCN.Models;
using WatchWebsite_TLCN.DTO;
using AutoMapper;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrdersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entities.Order>>> GetOrders()
        {
            return await _unitOfWork.Orders.GetAll();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Entities.Order>> GetOrder(int id)
        {
            var order = await _unitOfWork.Orders.Get(o => o.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Entities.Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _unitOfWork.Orders.Update(order);

            try
            {
                await _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await OrderExists(id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[HttpPost]
        //public async Task<ActionResult<Entities.Order>> PostOrder(Entities.Order order)
        //{
        //    await _unitOfWork.Orders.Insert(order);
        //    await _unitOfWork.Save();

        //    return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        //}

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Entities.Order>> DeleteOrder(int id)
        {
            var order = await _unitOfWork.Orders.Get(o => o.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }

            await _unitOfWork.Orders.Delete(id);
            await _unitOfWork.Save();

            return order;
        }

        private Task<bool> OrderExists(int id)
        {
            return _unitOfWork.Orders.IsExist<int>(id);
        }

        [HttpPost]
        [Route("CreateOrder")]
        public async Task<IActionResult> PostOrder(OrderDTO orderDTO)
        {
            try
            {
                var order = _mapper.Map<Entities.Order>(orderDTO);
                order.Total = await CalculateOrderAmount(orderDTO.Products) / 100;

                // Create order
                await _unitOfWork.Orders.Insert(order);
                await _unitOfWork.Save();

                // Create order detail and update product sold, amound columns
                foreach (var item in orderDTO.Products)
                {
                    var product = await _unitOfWork.Products.Get(p => p.Id == item.Id);
                    product.Sold = product.Sold + item.Quantity;
                    product.Amount = product.Amount - item.Quantity;
                    _unitOfWork.Products.Update(product);

                    var orderDetail = new OrderDetail()
                    {
                        OrderId = order.OrderId,
                        ProductId = item.Id,
                        Count = item.Quantity,
                        Price = product.Price,
                        ProductName = product.Name
                    };
                    await _unitOfWork.OrderDetails.Insert(orderDetail);
                }

                // Delete all cart items of user
                var cartItems = await _unitOfWork.Carts.GetAll(c => c.UserId == order.UserId);
                _unitOfWork.Carts.DeleteRange(cartItems);

                await _unitOfWork.Save();

                return Ok();
            }
            catch
            {
                return StatusCode(500, "Internal server error. Please  try again error!!");
            }
        }

        [HttpPost]
        [Route("Payment")]
        public async Task<IActionResult> Create(PaymentIntentCreateRequest request)
        {
            var paymentIntents = new PaymentIntentService();
            try
            {
                var paymentIntent = paymentIntents.Create(new PaymentIntentCreateOptions
                {
                    Amount = (long?)await CalculateOrderAmount(request.Products),
                    Currency = "usd",
                    PaymentMethodTypes = new List<string>{"card"}
                });
                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch
            {
                return StatusCode(500, "Internal server error. Please  try again error!!");
            }
        }
        private async Task<float> CalculateOrderAmount(List<ProductItem> products)
        {
            float total = 0;
            foreach(var item in products)
            {
                var prod = await _unitOfWork.Products.Get(p => p.Id == item.Id);
                total = total + prod.Price * item.Quantity;
            }
            return total*100;
        }

    }
}
