using System;

namespace my8Client.Models
{
    public class Experience
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string CompanyName { get; set; }
        public Location Location { get; set; }
        public DateTime FromDate { get; set; }
        public bool isCurrentlyWorkHere { get; set; }
        public DateTime? ToDate { get; set; }
        public Industry Industry { get; set; }
        public string WorkAs { get; set; }
        public string Description { get; set; }
        public string PersonId { get; set; }
        public long CreatedTime { get; set; }
        public long UpdatedTime { get; set; }
    }
}