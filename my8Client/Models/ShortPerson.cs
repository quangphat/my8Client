﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class ShortPerson
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Url { get; set; }
        public string Avatar { get; set; }
        public string WorkAs { get; set; }
        public string Company { get; set; }
        public double Rate { get; set; }//Đánh giá 
        public double Experience { get; set; }
    }
}
