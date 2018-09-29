import * as Models from '../Models'
import { Fetch } from './Fetch'
export const PersonRepository = {
    GetTopFriend: async () => {
        return Fetch.Get('/person/GetTopFriend', null).then(response => {
            return response;
        })
    },
    GetFollowingPages: async () => {
        return Fetch.Get('/Person/GetFollowingPages', null).then(response => {
            return response;
        })
    },
    GetPersonProfile: async (personName) => {
        return Fetch.Get(`/person/GetByUrl/${personName}`, null).then(response => {
            return response;
        })
    },
}
