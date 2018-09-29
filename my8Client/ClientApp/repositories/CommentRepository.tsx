import * as Models from '../Models'
import { Fetch } from './Fetch'
export const CommentRepository = {
    CreateComment: async (comment) => {
        return Fetch.Post('/comments', comment).then(response => {
            return response;
        })
    },
    GetPostComment: async (postId, postType, skip) => {
        return Fetch.Get(`/comments/${postId}/${postType}/${skip}`, null).then(response => {
            return response;
        })
    },
}
