using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class FeedLike
    {
        public string Id { get; set; }
        public PostType FeedType { get; set; }
        public string FeedId { get; set; }
        public Author Author { get; set; }
        public bool Liked { get; set; }
        public string BroadCastId { get; set; }
        public long LikedTimeUnix { get; set; }
        public string PersonId { get; set; }
        public ShortFeed Feed { get; set; }
    }
}
