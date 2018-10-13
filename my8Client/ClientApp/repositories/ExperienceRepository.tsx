
import { Fetch } from './Fetch'
export const ExperienceRepository = {
    CreateExperience: async (model) => {
        return Fetch.Post('/Experiences/create', model).then(response => {
            return response;
        })
    },
    GetExperiencesByPerson: async (profileId: string, page: number, limit: number) => {
        return Fetch.Get(`/Experiences/${profileId}/${page}/${limit}`).then(response => {
            return response;
        })
    }
}
