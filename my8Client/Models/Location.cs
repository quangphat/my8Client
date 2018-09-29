using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Location
    {
        public string Id { get; set; }
        public Country Country { get; set; }
        public Province Province { get; set; }
        public District District { get; set; }
        public string Street { get; set; }
        public string Display { get; set; }
        public string[] KeySearchs { get; set; }
    }
}
