using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchWebsite_TLCN.DTO;
using WatchWebsite_TLCN.Entities;

namespace WatchWebsite_TLCN.Configuration
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer()
        {
            CreateMap<Product, ProductDTO>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image))).ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Comment, CommentDTO>().ReverseMap();
            CreateMap<User, UserCommentDTO>().ForMember(dest => dest.Avatar, opt => opt.MapFrom(src => Convert.ToBase64String(src.Avatar))).ReverseMap();
            CreateMap<Energy, EnergyDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ForMember(dest => dest.Image, opt => opt.MapFrom(src => Convert.ToBase64String(src.Image))).ReverseMap();
            CreateMap<Material, MaterialDTO>().ReverseMap();
            CreateMap<WaterResistance, WaterResistancesDTO>().ReverseMap();


        }
    }
}
