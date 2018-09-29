using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Author
    {
        public string AuthorId { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public string Url { get; set; }
        public int AuthorTypeId { get; set; }
        public string Email { get; set; }
        public string WorkAs { get; set; }
        public string Company { get; set; }
    }
}
