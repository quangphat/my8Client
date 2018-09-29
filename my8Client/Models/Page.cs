using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Page
    {
        public string PageId { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public double Rate { get; set; }
        public string Url { get; set; }
        public int Follows { get; set; }
        public int PageIPoint { get; set; } //Page interaction point
        public string Title { get; set; }
    }
}
