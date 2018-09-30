import * as Router from 'react-router';
import * as H from 'history';
import {  HubConnectionBuilder } from '@aspnet/signalr';
import * as Models from '../Models';
export const History = H.createBrowserHistory({});
export const rowSkip = 10;

export const getLastInitBroadCastTime = (): number => {
    let raw = localStorage.getItem('initBroadcastTime');
    return Number(raw);
}
export const setLastInitBroadCastTime = () => {

    let now = getUtcNowInMilisecond();
    localStorage.setItem('initBroadcastTime', now.toString());
}
export const getUtcNowInMilisecond = () => {
    let now = new Date();
    let time = now.getTime();
    let offset = now.getTimezoneOffset();
    offset = offset * 60000;
    return time - offset;
}


export const getCurrentAccount = (): Models.IShortPerson => {
    let account = document['account'] as Models.IShortPerson;
    return account;
}
export const getParamFromPathname = (pathname, index): string => {
    if (isNullOrEmpty(pathname)) return '';
    let arr = pathname.split('/');
    return arr[index];
}
export const setFollowingPages = (data: Models.IPage[]) => {
    localStorage.setItem("followingpages", JSON.stringify(data));
}
export const getFollowingPages = (): Models.IPage[] => {
    let raw = localStorage.getItem("followingpages");
    let data = JSON.parse(raw) as Models.IPage[];
    return data;
}

export const setFriends = (personAllIns: Models.IPersonAllin[]) => {
    let friends = personAllIns.map(p => p.Person);
    localStorage.setItem("friends", JSON.stringify(friends));
}
export const getFriends = (): Models.IShortPerson[] => {
    //let json = document['friends'];
    let friendsRaw = localStorage.getItem("friends");
    let friends = JSON.parse(friendsRaw) as Models.IShortPerson[];
    return friends;
}
export const setJobFunctions = (jobFunctions: Models.IJobFunction[]) => {
    localStorage.setItem("jobFunctions", JSON.stringify(jobFunctions));
}
export const getJobFunctions = (): Models.IJobFunction[] => {
    let raw = localStorage.getItem("jobFunctions");
    let jobFunctions = JSON.parse(raw) as Models.IJobFunction[];
    return jobFunctions;
}
export const isNullOrEmpty = (str: string): boolean => {
    if (!str || str === '' || str == undefined)
        return true
    return false;
}
export const isNullOrUndefined = (obj: any): boolean => {
    if (obj == null || obj === '' || obj == undefined)
        return true
    return false;
}
export const isArrNullOrHaveNoItem = (arr: any[]): boolean => {
    if (arr == null || arr.length == 0 || arr == undefined)
        return true
    return false;
}
export const Path = {
    index: '/',
    login: '/Account/Login',
    jobPosting: '/jobPosting'
}
export const Api = {
    //feed
    Feed_feeds: (skip: number): string => `/feeds/gets/${skip}`,
    LikeFeed: (): string => '/feed/like',
    InitFeedBroadCast: "/feed/init",
    //comment
    getPostComments: (postId: string, postType: number, skip: number) => `/comment/getbyPost/${postId}/${postType}/${skip}`,
    createStatusPost: '/StatusPost/Create',
    createComment: (): string => '/Comment/Create',
    getFollowingPages: (): string => '/Person/GetFollowingPages',
    createJobPost: '/JobPost/Create',
    getTopInteractiveFriends: (): string => '/person/GetTopFriend',
    //profile
    getPersonProfile: (url:string): string => `/person/GetByUrl/${url}`,
    //job function
    getJobFunctions: (searchStr: string): string => `/jobfunction/search/${searchStr}`
}

export const GetCurrentUserAvatar = (): string => {
    return '../../../../assets/images/avatar/avatar_main.png';
}
export const GetCurrentUserAvatar100 = (): string => {
    return '../../../../assets/images/avatar/clarkkent.jpg';
}
export const splitArrIntoTwo = (arr: any[], isGetfirstHalf: boolean): any => {
    //isGetfirstHalf : true for get the first half, false for get the second half
    if (arr == null || arr.length == 0) return null;
    let firstHalfLength = Math.round(arr.length / 2)
    let leftHalf = arr.length - firstHalfLength;
    if (isGetfirstHalf === true) {
        return arr.slice(0, firstHalfLength);
    }
    else {
        return arr.slice(firstHalfLength);
    }
}

export const getNewGuid = (): string => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
export const deepClone = (source: any) => {
    return JSON.parse(JSON.stringify(source))
}
export const transitionTo = (path: string, reload?: boolean, routeHistory?: H.History) => {
    if (reload)
        window.location.assign(path)
    else
        (routeHistory || History).push(path)
}
//export const hubConnection = new HubConnectionBuilder().withUrl('/chat').build();
//export const createHubConnection = () => {
//    hubConnection.start();
//}
