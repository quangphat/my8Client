using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class StatusPost
    {
        public StatusPost() { }
        public StatusPost(string id)
        {
            this.Id = id;
        }
        public string Id { get; set; }
        public DateTime PostTime { get; set; }
        public long PostTimeUnix { get; set; }
        public string Content { get; set; }
        public Author PostBy { get; set; }// có thể là người/trang post, người like, người comment,...
        public DateTime EditedTime { get; set; }
        public long EditedTimeUnix { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; } //Số comment
        public int Shares { get; set; }
        public int Views { get; set; }
        public string[] Images { get; set; }
        public List<ShortPerson> PersonTags { get; set; }
        public bool IsShareExperience { get; set; }//Gắn thẻ là bài đăng chia sẻ kiến thức
        public bool IsAds { get; set; }//bài đăng quảng cáo.
        public int Privacy { get; set; }
        public int PostType { get; } = 1;
        public string PersonId { get; set; }
        public ActionAsType PostingAsType { get; set; }
    }
}
