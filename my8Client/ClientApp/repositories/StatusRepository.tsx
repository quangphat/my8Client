import * as Models from '../Models'
import { Fetch } from './Fetch'
export const StatusRepository = {
    PostStatus: async (status) => {
        return Fetch.Post('/StatusPost/Create', status).then(response => {
            return response;
        })
    },
}
