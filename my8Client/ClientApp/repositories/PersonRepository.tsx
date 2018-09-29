import * as Models from '../Models'
import { Fetch } from './Fetch'
export const PersonRepository = {
    GetTopFriend: async () => {
        return Fetch.Get('/persons/TopFriend', null).then(response => {
            return response;
        })
    },
    GetFollowingPages: async () => {
        return Fetch.Get('/persons/FollowingPages', null).then(response => {
            return response;
        })
    },
    GetPersonProfile: async (personName) => {
        return Fetch.Get(`/persons/GetByUrl/${personName}`, null).then(response => {
            return response;
        })
    },
}
