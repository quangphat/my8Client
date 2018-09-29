﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace my8Client.Models
{
    public class Feed
    {
        public string Id { get; set; }
        public string PersonId { get; set; }
        public DateTime PostTime { get; set; }
        public long PostTimeUnix { get; set; }
        public string Content { get; set; }
        public Author PostBy { get; set; }// có thể là người/trang post, người like, người comment,...
        public ActionAsType PostingAs { get; set; } //Từ cách người đăng: người, trang, cộng đồng
        public DateTime EditedTime { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; } //Số comment
        public int Shares { get; set; }
        public int Views { get; set; }
        public string[] Images { get; set; }
        public List<ShortPerson> PersonTags { get; set; }
        public bool IsFindJob { get; set; }//Gắn thẻ là tìm việc
        public bool IsShareExperience { get; set; }//Gắn thẻ là bài đăng chia sẻ kiến thức
        public bool IsAds { get; set; }//bài đăng quảng cáo.
        public List<Industry> IndustryTags { get; set; }//Lĩnh vực công việc
        public List<Skill> SkillTags { get; set; }
        public List<Location> Locations { get; set; }

        public int MinExperience { get; set; }
        public int MaxExperience { get; set; }
        public List<Degree> Degrees { get; set; }
        public bool Active { get; set; }
        public int Privacy { get; set; }
        public SeniorityLevelType Seniority { get; set; }
        public EmploymentType EmploymentType { get; set; }

        public int Applies { get; set; }
        public decimal MinSalary { get; set; }
        public decimal MaxSalary { get; set; }
        public string Title { get; set; }
        public string EmailToReceiveApply { get; set; }
        public int PostType { get; set; }
        public string BroadcastId { get; set; }
        public bool Liked { get; set; }
    }
}
