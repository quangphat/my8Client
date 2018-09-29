import { IAuthor } from '../Models/IAuthor';
import { IShortPerson } from '../Models/IShortPerson';
export interface IStatusPost {
    Id: string,
    PostTime: string,
    PostTimeUnix: number,
    Content: string,
    PostBy: IAuthor,
    EditedTime: string,
    EditedTimeUnix: number,
    Likes: number,
    Comments: number,
    Shares: number,
    Views: number,
    Images: string[],
    PersonTags: IShortPerson[],
    IsShareExperience: boolean,
    IsAds: boolean,
    Privacy: number,
    PostType: number,
    PersonId: string,
    PostingAsType: string
}
//<AppendNewHere>