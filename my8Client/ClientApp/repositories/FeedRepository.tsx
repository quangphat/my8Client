import * as Models from '../Models'
import { Fetch } from './Fetch'
export const FeedRepository = {
    InitBroadCast: async () => {
        return Fetch.Post("/Feeds/init", null).then(response => {
            return response;
        })
    },
    GetFeeds: async (skip: number) => {
        let path = `/Feeds/${skip}`
        return Fetch.Get(path).then(response => {
            return response;
        })
    },
    LikeFeed: async (feedlike) => {
        let path = '/Feeds/like'
        return Fetch.Post(path, feedlike).then(response => {
            return response;
        })
    },
}
