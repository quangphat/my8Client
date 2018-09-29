using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Industry
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Display { get; set; }
        public string[] KeySearchs { get; set; }
    }
}
