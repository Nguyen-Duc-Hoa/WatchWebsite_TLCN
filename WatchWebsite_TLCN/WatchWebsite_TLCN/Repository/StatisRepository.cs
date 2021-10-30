using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;
using WatchWebsite_TLCN.Intefaces;
using WatchWebsite_TLCN.Models;

namespace WatchWebsite_TLCN.Repository
{
    public class StatisRepository : IStatis
    {
        private readonly MyDBContext _context;
        public StatisRepository(MyDBContext context)
        {
            _context = context;
        }

        //Flag = 1
        public IEnumerable<Chart1DTO> Statis1ByDate(Statis statis)
        {
            
            var list = (from order in _context.Orders
                        where order.OrderDate >= statis.date[0] && order.OrderDate <= statis.date[1] && order.DeliveryStatus == "Complete"              
                        group order by order.OrderDate into g
                        orderby g.Key ascending
                        select new Chart1DTO
                        {
                            Time = g.Key.ToString("dd-MM-yyyy"),
                            TurnOver = g.Sum(x=> x.Total)
                        }).ToList();
            return list;
        }

        public IEnumerable<Chart1DTO> Statis1ByMonth(Statis statis)
        {
            //get firstDay and lastDay of Month
            DateTime date0 = firstDayOfMonth(statis.date[0]);
            DateTime date1 = lastDayOfMonth(statis.date[1]);


            var list = (from order in _context.Orders
                        where order.OrderDate >= date0 && order.OrderDate <= date1 && order.DeliveryStatus == "Complete"
                        orderby order.OrderDate ascending
                        group order by new { month = order.OrderDate.Month, year = order.OrderDate.Year } into g
                        select new Chart1DTO
                        {
                            Time = string.Format("{0}/{1}", g.Key.month, g.Key.year),
                            TurnOver = g.Sum(x => x.Total)
                        }).ToList();
            
            return list;
        }

        public IEnumerable<Chart1DTO> Statis1ByYear(Statis statis)
        {
            var list = (from order in _context.Orders
                        where order.OrderDate.Year >= statis.date[0].Year && order.OrderDate.Year <= statis.date[1].Year && order.DeliveryStatus == "Complete"
                        group order by order.OrderDate.Year into g
                        orderby g.Key ascending
                        select new Chart1DTO
                        {
                            Time = g.Key.ToString(),
                            TurnOver = g.Sum(x => x.Total)
                        }).ToList();
            return list;
        }



        public IEnumerable<Chart2DTO> Statis2ByDate(Statis statis)
        {
            var list = (from x in (from o in _context.Orders
                                   join d in _context.OrderDetails on o.OrderId equals d.OrderId
                                   join p in _context.Products on d.ProductId equals p.Id
                                   where o.OrderDate >= statis.date[0] && o.OrderDate <= statis.date[1] && o.DeliveryStatus == "Complete"
                                   select new
                                   {
                                       name = p.Name,
                                       count = d.Count,
                                       date = o.OrderDate
                                   })
                        group x by new { x.name, x.date.Year } into g
                        orderby new { g.Key.Year, V = g.Sum(x => x.count) } ascending
                        select new Chart2DTO
                        {
                            Name = g.Key.name,
                            Year = g.Key.Year.ToString(),
                            Value = g.Sum(count => count.count)

                        }).ToList();
            return list;
        }

        public IEnumerable<Chart2DTO> Statis2ByMonth(Statis statis)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Chart2DTO> Statis2ByYear(Statis statis)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Chart2DTO> StatisProduct()
        {
            var list = (from x in (from o in _context.Orders
                                   join d in _context.OrderDetails on o.OrderId equals d.OrderId
                                   join p in _context.Products on d.ProductId equals p.Id
                                   where o.DeliveryStatus == "Complete"
                                   select new 
                                   {
                                       name = p.Name,
                                       value = d.Count * d.Price,
                                       year = o.OrderDate.Year
                                   })
                        group x by new { x.name, x.year } into g
                        orderby g.Key.year ascending , g.Sum(x => x.value) descending
                        select new Chart2DTO
                        {
                            Name = g.Key.name,
                            Year = g.Key.year.ToString(),
                            Value = (int)g.Sum(count => count.value)

                        }).ToList();
            return list;
        }

        public DateTime firstDayOfMonth(DateTime date)
        {
            DateTime firstDay;
            firstDay = new DateTime(date.Year, date.Month, 1);
            return firstDay;
        }

        public DateTime lastDayOfMonth(DateTime date)
        {
            DateTime lastDay = firstDayOfMonth(date).AddMonths(1).AddDays(-1);
            return lastDay;
        }

    }
}
