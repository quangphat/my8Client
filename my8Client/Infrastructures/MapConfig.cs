using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using my8Client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Infrastructures
{
    public class MapConfig
    {
        public static void Config(IServiceCollection services)
        {
            Mapper.Initialize(mapper =>
            {
                ConfigMapper(mapper);
            });
        }
        public static void ConfigMapper(IMapperConfigurationExpression mapper)
        {
            mapper.AllowNullCollections = true;
            mapper.CreateMap<Account, Person>();
            mapper.CreateMap<Person, Account>();
            mapper.CreateMap<Account, Author>()
                .ForMember(a => a.AuthorId, b => b.MapFrom(c => c.PersonId))
                .ForMember(a => a.DisplayName, b => b.MapFrom(c => c.DisplayName))
                .ForMember(a => a.Avatar, b => b.MapFrom(c => c.Avatar))
                .ForMember(a => a.Url, b => b.MapFrom(c => c.ProfileName))
                .ForMember(a => a.WorkAs, b => b.MapFrom(c => c.WorkAs))
                .ForMember(a => a.Company, b => b.MapFrom(c => c.Company))
                 .ForMember(a => a.AuthorTypeId, b => b.MapFrom(c => 1));
            mapper.CreateMap<Author, Account>()
                .ForMember(a => a.PersonId, b => b.MapFrom(c => c.AuthorId))
                .ForMember(a => a.DisplayName, b => b.MapFrom(c => c.DisplayName))
                .ForMember(a => a.Avatar, b => b.MapFrom(c => c.Avatar))
                .ForMember(a => a.WorkAs, b => b.MapFrom(c => c.WorkAs))
                .ForMember(a => a.Company, b => b.MapFrom(c => c.Company))
                .ForMember(a => a.ProfileName, b => b.MapFrom(c => c.Url));
            mapper.CreateMap<Account, SignalRAccount>()
                .ForMember(a => a.PersonId, b => b.MapFrom(c => c.PersonId));
            //<AppendNewHere>
        }
    }
}
