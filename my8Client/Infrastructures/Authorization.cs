using AutoMapper;
using my8Client.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Infrastructures
{
    public class CurrentProcess
    {
        public AccountModel CurrentAccount { get; set; }
    }
    public class AppConfig
    {
        public string ClientId { get; set; }
        public string Authority { get; set; }
    }
}
