import * as Models from '../Models'
import { Fetch } from './Fetch'
export const JobRepository = {
    PostJob: async (job) => {
        return Fetch.Post('/JobPost/Create', job).then(response => {
            return response;
        })
    },
    GetJobFunction: async (searchStr) => {
        return Fetch.Get(`/jobfunctions/${encodeURI(searchStr)}`, null).then(response => {
            return response;
        })
    },
}
