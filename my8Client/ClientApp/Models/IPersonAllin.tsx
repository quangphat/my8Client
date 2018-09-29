import { IShortPerson } from '../Models/IShortPerson';
import { IFollowEdge } from '../Models/IFollowEdge';
import { IFriendEdge } from '../Models/IFriendEdge';
import { IJoinEdge } from '../Models/IJoinEdge';
export interface IPersonAllin {
    Person: IShortPerson,
    FollowPage: IFollowEdge,
    Friend: IFriendEdge,
    JoinCommunity: IJoinEdge,
    CommonFriend: number,
    Total: number,

}
//<AppendNewHere>