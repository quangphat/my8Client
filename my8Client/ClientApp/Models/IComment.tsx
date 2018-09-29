import { IAuthor } from '../Models/IAuthor';
import { IShortFeed } from '../Models/IShortFeed';
export interface IComment {
    Id: string,
    Commentator: IAuthor,
    CommentTime: string,
    CommentTimeUnix: number,
    EditedTime: string,
    EditedTimeUnix: number,
    Likes: number,
    Replies: number,
    FeedId: string,
    FeedType: number,
    Content: string,
    Feed: IShortFeed,
    PersonId: string
}
//<AppendNewHere>