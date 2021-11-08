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
using WatchWebsite_TLCN.Intefaces;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserOrder _userOrder;

        public OrdersController(IUnitOfWork unitOfWork, IMapper mapper, IUserOrder userOrder)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userOrder = userOrder;
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

        // POST: /api/Orders/CreateOrder
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

        // POST: /api/Orders/Payment
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


        //GET: api/orders/getbyuser
        [HttpGet]
        [Route("GetByUser/{userid}")]
        public IEnumerable<Entities.Order> GetByUser(int userid)
        {
            var order = _userOrder.GetByUser(userid);
            return order;
        }


        // Lich su mua hang tren trang user
        // Get: api/orders/history?currentPage=1&userid=1
        [HttpGet]
        [Route("History")]
        public async Task<IActionResult> GetHistory(int currentPage, int userid)
        {

            var result = await _unitOfWork.Orders.GetAllWithPagination(
                expression: p=>p.UserId == userid && p.DeliveryStatus == "Complete",
                orderBy: x => x.OrderBy(a => a.OrderDate),
                pagination: new Pagination { CurrentPage = currentPage }
                );


            var listHistories = _mapper.Map<List<ListOrderDTO>>(result.Item1);

            return Ok(new
            {
                Histories = listHistories,
                CurrentPage = result.Item2.CurrentPage,
                TotalPage = result.Item2.TotalPage
            });
        }

        // xem detail don hang tren trang user
        // get: api/orders/getorderdetail?orderid=1&userid=1
        [HttpGet]
        [Route("GetOrderDetail")]
        public async Task<IActionResult> GetOrderDetail(int orderid, int userid)
        {
            // Thong tin cua order
            var order = await _unitOfWork.Orders.Get(x => x.OrderId == orderid && x.UserId == userid);
            var user = await _unitOfWork.Users.Get(x => x.Id == userid);

            if(order != null)
            {
                
                //Lay danh sach cac san pham trong order
                var orderDetails = _userOrder.GetOrderDetails(orderid);
                return Ok(new 
                { 
                    OrderId = order.OrderId,
                    Address = order.Address,
                    Phone = order.Phone,
                    Email = user.Email,
                    Products = orderDetails
                });
            }

            return NotFound();
            
        }


        //PUT: api/orders/UpdateStatus?orderid=1&status=Confirmed
        [HttpPut]
        [Route("UpdateStatus")]
        public Entities.Order UpdateStatus(int orderid, string status)
        {
            var order = _userOrder.UpdateStatus(orderid, status);
            return order;
        }

    }
}
