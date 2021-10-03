using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterResistancesController : ControllerBase
    {
        private readonly MyDBContext _context;

        public WaterResistancesController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/WaterResistances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterResistance>>> GetWaterResistances()
        {
            return await _context.WaterResistances.ToListAsync();
        }

        // GET: api/WaterResistances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WaterResistance>> GetWaterResistance(int id)
        {
            var waterResistance = await _context.WaterResistances.FindAsync(id);

            if (waterResistance == null)
            {
                return NotFound();
            }

            return waterResistance;
        }

        // PUT: api/WaterResistances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWaterResistance(int id, WaterResistance waterResistance)
        {
            if (id != waterResistance.WaterId)
            {
                return BadRequest();
            }

            _context.Entry(waterResistance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WaterResistanceExists(id))
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

        // POST: api/WaterResistances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<WaterResistance>> PostWaterResistance(WaterResistance waterResistance)
        {
            _context.WaterResistances.Add(waterResistance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWaterResistance", new { id = waterResistance.WaterId }, waterResistance);
        }

        // DELETE: api/WaterResistances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<WaterResistance>> DeleteWaterResistance(int id)
        {
            var waterResistance = await _context.WaterResistances.FindAsync(id);
            if (waterResistance == null)
            {
                return NotFound();
            }

            _context.WaterResistances.Remove(waterResistance);
            await _context.SaveChangesAsync();

            return waterResistance;
        }

        private bool WaterResistanceExists(int id)
        {
            return _context.WaterResistances.Any(e => e.WaterId == id);
        }
    }
}
