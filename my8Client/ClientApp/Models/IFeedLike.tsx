import { IAuthor } from '../Models/IAuthor';
import { IShortFeed } from '../Models/IShortFeed';
export interface IFeedLike {
    Id: string,
    FeedType: number,
    FeedId: string,
    Author: IAuthor,
    Liked: boolean,
    BroadCastId: string,
    Feed: IShortFeed,
    PersonId: string
}
//<AppendNewHere>