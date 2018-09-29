import { IAuthor } from '../Models/IAuthor';
import { IShortPerson } from '../Models/IShortPerson';
import { IIndustry } from '../Models/IIndustry';
import { ILocation } from '../Models/ILocation';
import { ISkill } from '../Models/ISkill';
import { IDegree } from '../Models/IDegree';
import { ISeniorityLevel } from '../Models/ISeniorityLevel';
import { IEmploymentType } from '../Models/IEmploymentType';
import { IJobFunction } from '../Models/IJobFunction';
export interface IJobPost {
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
    IsFindJob: boolean,
    Applies: number,
    MinSalary: number,
    MaxSalary: number,
    Title: string,
    EmailToReceiveApply: string,
    IndustryTags: IIndustry[],
    SkillTags: ISkill[],
    Locations: ILocation[],
    Degrees: IDegree[],
    Active: boolean,
    Expire: string,
    SeniorityType: number,
    EmploymentType: number,
    MinExperience: number,
    MaxExperience: number,
    PostType: number,
    PersonId: string,
    PostingAsType: string,
    CompanyName: string,
    JobFunctionTags: IJobFunction[]
}
//<AppendNewHere>