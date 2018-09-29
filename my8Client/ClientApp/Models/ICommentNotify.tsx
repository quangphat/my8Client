import { IAuthor } from '../Models/IAuthor';
export interface ICommentNotify {
    Id: string,
    Commentator: IAuthor,
    CommentTimeUnix: number,
    CommentId: string,
    FeedId: string,
    FeedType: number,
    Content: string,
    FeedAuthorId: string,
    FeedAuthorType: number
}
//<AppendNewHere>