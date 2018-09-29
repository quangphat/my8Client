
export interface INotification {
    Id: string,
    AuthorId: string,
    AuthorDisplayName: string,
    AuthorType: number,
    NotifyType: number,
    CommentId: string,
    FeedId: string,
    FeedType: number,
    ReceiverId: string,
    ReceiverType: number,
    NotifyTimeUnix: number,
    OthersCount: number,
    Content: string

}
//<AppendNewHere>