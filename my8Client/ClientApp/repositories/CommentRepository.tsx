import * as Models from '../Models'
import { Fetch } from './Fetch'
export const CommentRepository = {
    CreateComment: async (comment) => {
        return Fetch.Post('/Comment/Create', comment).then(response => {
            return response;
        })
    },
    GetPostComment: async (postId, postType, skip) => {
        return Fetch.Get(`/comment/getbyPost/${postId}/${postType}/${skip}`, null).then(response => {
            return response;
        })
    },
}
