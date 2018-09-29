import { ICommunityPrivacy } from '../Models/ICommunityPrivacy'

export interface ICommunity
{
	 CommunityId: string,
	 DisplayName: string,
	 Avatar: string,
	 Rate: number,
	 Privacy: ICommunityPrivacy,
	 Joins: number,
	 CommunityIPoint: number,
	 Title: string,
}
//<AppendNewHere>