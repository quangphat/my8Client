import { IAuthor } from '../Models/IAuthor';
import { IIndustry } from '../Models/IIndustry';
import { ILocation } from '../Models/ILocation';
import { ISkill } from '../Models/ISkill';
import { IDegree } from '../Models/IDegree';
import { ISeniorityLevel } from '../Models/ISeniorityLevel';
import { IEmploymentType } from '../Models/IEmploymentType';
import { IShortPerson } from '../Models/IShortPerson';
export interface IFeed {
    Id: string,
    PostTime: Date,
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
    IsFindJob: boolean,
    IsShareExperience: boolean,
    IsAds: boolean,
    IndustryTags: IIndustry[],
    SkillTags: ISkill[],
    Locations: ILocation[],
    MinExperience: number,
    MaxExperience: number,
    Degrees: IDegree[],
    Active: boolean,
    Privacy: number,
    Seniority: ISeniorityLevel,
    EmploymentType: IEmploymentType,
    Applies: number,
    MinSalary: number,
    MaxSalary: number,
    Title: string,
    EmailToReceiveApply: string,
    PostType: number,
    Liked: boolean,
    BroadcastId: string,
    PostingAs: number,
    PersonId: string
}