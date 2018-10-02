import * as Models from '../Models'
import { Fetch } from './Fetch'
export const StatusRepository = {
    PostStatus: async (status) => {
        return Fetch.Post('/StatusPosts/Create', status).then(response => {
            return response;
        })
    },
    GetStatusPostByAuthor: async (authorId: string, authorType: number, page: number, limit: number) => {
        return Fetch.Get(`/StatusPosts/${authorId}/${authorType}/${page}/${limit}`).then(response => {
            return response;
        })
    },
}
