using my8Client.Infrastructures;

namespace my8Client.Models
{
    public class Notification
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorDisplayName { get; set; }
        public AuthorType AuthorType { get; set; }
        public NotifyType NotifyType { get; set; }
        public string CommentId { get; set; }
        public string FeedId { get; set; }
        public PostType FeedType { get; set; }
        public string[] ReceiversId { get; set; }//alway is person
        public string TargetId { get; set; } //Page or Community
        public long NotifyTimeUnix { get; set; }
        public long OthersCount { get; set; }
        public string Content
        {
            get
            {
                if (NotifyType == NotifyType.Comment)
                    return OthersCount > 0 ? $"{AuthorDisplayName} và {OthersCount} người khác đã bình luận về bài đăng của bạn." : $"{AuthorDisplayName} đã bình luận về bài đăng của bạn.";
                else if (NotifyType == NotifyType.Like)
                    return OthersCount > 0 ? $"{AuthorDisplayName} và {OthersCount} người khác đã thích bài đăng của bạn." : $"{AuthorDisplayName} đã thích bài đăng của bạn.";
                else if (NotifyType == NotifyType.Share)
                    return OthersCount > 0 ? $"{AuthorDisplayName} và {OthersCount} người khác đã chia sẻ bài đăng của bạn." : $"{AuthorDisplayName} đã chia sẻ bài đăng của bạn.";
                else
                    return string.Empty;
            }
        }
        public NotificationTargetType TargetType { get; set; }
    }
}
