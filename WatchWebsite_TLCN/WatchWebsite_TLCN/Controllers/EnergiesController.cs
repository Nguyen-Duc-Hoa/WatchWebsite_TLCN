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
    public class EnergiesController : ControllerBase
    {
        private readonly MyDBContext _context;

        public EnergiesController(MyDBContext context)
        {
            _context = context;
        }

        // GET: api/Energies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Energy>>> GetEnegies()
        {
            return await _context.Enegies.ToListAsync();
        }

        // GET: api/Energies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Energy>> GetEnergy(int id)
        {
            var energy = await _context.Enegies.FindAsync(id);

            if (energy == null)
            {
                return NotFound();
            }

            return energy;
        }

        // PUT: api/Energies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEnergy(int id, Energy energy)
        {
            if (id != energy.EnergyId)
            {
                return BadRequest();
            }

            _context.Entry(energy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EnergyExists(id))
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

        // POST: api/Energies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Energy>> PostEnergy(Energy energy)
        {
            _context.Enegies.Add(energy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEnergy", new { id = energy.EnergyId }, energy);
        }

        // DELETE: api/Energies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Energy>> DeleteEnergy(int id)
        {
            var energy = await _context.Enegies.FindAsync(id);
            if (energy == null)
            {
                return NotFound();
            }

            _context.Enegies.Remove(energy);
            await _context.SaveChangesAsync();

            return energy;
        }

        private bool EnergyExists(int id)
        {
            return _context.Enegies.Any(e => e.EnergyId == id);
        }
    }
}
