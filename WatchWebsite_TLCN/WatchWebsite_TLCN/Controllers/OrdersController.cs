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

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrdersController(IUnitOfWork unitOfWork)
        {
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
        [HttpPost]
        public async Task<ActionResult<Entities.Order>> PostOrder(Entities.Order order)
        {
            await _unitOfWork.Orders.Insert(order);
            await _unitOfWork.Save();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

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
        [Route("Payment")]
        public async Task<IActionResult> Create(PaymentIntentCreateRequest request)
        {
            var paymentIntents = new PaymentIntentService();
            try
            {
                var paymentIntent = paymentIntents.Create(new PaymentIntentCreateOptions
                {
                    Amount = CalculateOrderAmount(request.Items),
                    Currency = "eur",
                    PaymentMethodTypes = new List<string>{"card"}
                });
                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch(Exception ex)
            {
                return Ok(ex.ToString());
            }
            return Ok();
        }
        private int CalculateOrderAmount(Item[] items)
        {
            // Replace this constant with a calculation of the order's amount
            // Calculate the order total on the server to prevent
            // people from directly manipulating the amount on the client
            return 1400;
        }

        public class Item
        {
            [JsonProperty("id")]
            public string Id { get; set; }
        }

        public class PaymentIntentCreateRequest
        {
            [JsonProperty("items")]
            public Item[] Items { get; set; }
        }
    }
}
