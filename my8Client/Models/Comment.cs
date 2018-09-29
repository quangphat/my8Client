using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Comment
    {
        public string Id { get; set; }
        public Author Commentator { get; set; }
        public string PersonId { get; set; }
        public DateTime CommentTime { get; set; }
        public long CommentTimeUnix { get; set; }
        public DateTime EditedTime { get; set; }
        public long EditedTimeUnix { get; set; }
        public int Likes { get; set; }
        public int Replies { get; set; } //Lượt trả lời
        public string FeedId { get; set; }
        public int FeedType { get; set; }
        public string Content { get; set; }
        public ShortFeed Feed { get; set; }
    }
}
