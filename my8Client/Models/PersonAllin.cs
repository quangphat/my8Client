﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class PersonAllin
    {
        public ShortPerson Person { get; set; }
        public FollowEdge FollowPage { get; set; }
        public FriendEdge Friend { get; set; }
        public JoinEdge JoinCommunity { get; set; }
        public int CommonFriend { get; set; }
        public int Total { get; set; }
    }
}
