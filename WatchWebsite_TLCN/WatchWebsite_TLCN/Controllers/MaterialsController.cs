using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.IRepository;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MaterialsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Materials
        [HttpGet]
        public async Task<IActionResult> GetMaterials(int currentPage)
        {
            var result = await _unitOfWork.Brands.GetAllWithPagination(
                expression: null,
                orderBy: x => x.OrderBy(a => a.BrandId),
                pagination: new Pagination { CurrentPage = currentPage }
                );

            var listMaterialDTO = _mapper.Map<List<Material>>(result.Item1);

            return Ok(new
            {
                Materials = listMaterialDTO,
                CurrentPage = result.Item2.CurrentPage,
                TotalPage = result.Item2.TotalPage
            });
        }

        // GET: api/Materials/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Material>> GetMaterial(int id)
        {
            var material = await _unitOfWork.Materials.Get( x=>x.MaterialId == id);

            if (material == null)
            {
                return NotFound();
            }

            return material;
        }

        // PUT: api/Materials/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial(int id, Material material)
        {
            if (id != material.MaterialId)
            {
                return BadRequest();
            }

            _unitOfWork.Materials.Update(material);

            try
            {
                await _unitOfWork.Save();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await MaterialExists(id))
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

        // POST: api/Materials
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Material>> PostMaterial(Material material)
        {
            await _unitOfWork.Materials.Insert(material);
            await _unitOfWork.Save();

            return CreatedAtAction("GetMaterial", new { id = material.MaterialId }, material);
        }

        // DELETE: api/Materials/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Material>> DeleteMaterial(int id)
        {
            var material = await _unitOfWork.Materials.Get(x=> x.MaterialId == id);
            if (material == null)
            {
                return NotFound();
            }

            await _unitOfWork.Materials.Delete(material);
            await _unitOfWork.Save();

            return material;
        }

        [HttpDelete()]
        [Route("Delete")]
        public async Task<ActionResult<Brand>> DeleteMaterial(List<int> id)
        {
            foreach (int item in id)
            {
                try
                {
                    var brand = await _unitOfWork.Materials.Get(b => b.MaterialId == item);
                    if (brand == null)
                    {
                        return BadRequest("Something was wrong!");
                    }

                    await _unitOfWork.Materials.Delete(item);
                    await _unitOfWork.Save();
                }
                catch (Exception e)
                {
                    return BadRequest(e.ToString());
                }

            }


            return RedirectToAction(nameof(GetMaterials), new { currentPage = 1 });
        }


        private Task<bool> MaterialExists(int id)
        {
            return _unitOfWork.Materials.IsExist<int>(id);
        }
    }
}
