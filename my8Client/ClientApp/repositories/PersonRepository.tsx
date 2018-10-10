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
    GetPersonProfile: async (profileName) => {
        return Fetch.Get(`/persons/GetByProfileName/${profileName}`, null).then(response => {
            return response;
        })
    },
}
