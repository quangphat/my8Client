import * as Models from '../Models'
import { Fetch } from './Fetch'
export const JobRepository = {
    PostJob: async (job) => {
        return Fetch.Post('/JobPosts/Create', job).then(response => {
            return response;
        })
    },
    GetJobFunction: async (searchStr) => {
        return Fetch.Get(`/jobfunctions/${encodeURI(searchStr)}`, null).then(response => {
            return response;
        })
    },
    GetJobPostByAuthor: async (authorId: string, authorType: number, page: number, limit: number) => {
        return Fetch.Get(`/JobPosts/${authorId}/${authorType}/${page}/${limit}`).then(response => {
            return response;
        })
    }
}
