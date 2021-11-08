using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.IRepository;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SizesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Sizes
        [HttpGet]
        public async Task<IActionResult> GetSizes(int currentPage)
        {
            var result = await _unitOfWork.Sizes.GetAllWithPagination(
                expression: null,
                orderBy: x => x.OrderBy(a => a.SizeId),
                pagination: new Pagination { CurrentPage = currentPage }
                );

            var listSizeDTO = _mapper.Map<List<SizeDTO>>(result.Item1);

            return Ok(new
            {
                Sizes = listSizeDTO,
                CurrentPage = result.Item2.CurrentPage,
                TotalPage = result.Item2.TotalPage
            });
        }

        // GET: api/Sizes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Size>> GetSize(int id)
        {
            var size = await _unitOfWork.Sizes.Get(x => x.SizeId == id);

            if (size == null)
            {
                return NotFound();
            }

            return size;
        }

        // PUT: api/Sizes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSize(int id, Size size)
        {
            if (id != size.SizeId)
            {
                return BadRequest();
            }

            _unitOfWork.Sizes.Update(size);

            try
            {
                await _unitOfWork.Save();
                return RedirectToAction(nameof(GetSizes), new { currentPage = 1 });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await SizeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return NoContent();
        }

        // POST: api/Sizes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Size>> PostSize(Size size)
        {
            try
            {
                await _unitOfWork.Sizes.Insert(size);
                await _unitOfWork.Save();

                return Ok();
            }
            catch
            { }

            return BadRequest();
            //return CreatedAtAction("GetSize", new { id = size.SizeId }, size);
        }

        // DELETE: api/Sizes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Size>> DeleteSize(int id)
        {
            var size = await _unitOfWork.Sizes.Get(x=>x.SizeId==id);
            if (size == null)
            {
                return NotFound();
            }

            await _unitOfWork.Sizes.Delete(id);
            await _unitOfWork.Save();

            return size;
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<ActionResult<Brand>> DeleteSize(List<int> id)
        {
            foreach (int item in id)
            {
                try
                {
                    var brand = await _unitOfWork.Sizes.Get(b => b.SizeId == item);
                    if (brand == null)
                    {
                        return BadRequest("Something was wrong!");
                    }

                    await _unitOfWork.Sizes.Delete(item);
                    await _unitOfWork.Save();
                }
                catch (Exception e)
                {
                    return BadRequest(e.ToString());
                }

            }


            return RedirectToAction(nameof(GetSizes), new { currentPage = 1 });
        }


        private Task<bool> SizeExists(int id)
        {
            return _unitOfWork.Sizes.IsExist<int>(id);
        }
    }
}
