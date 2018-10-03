
import { Fetch } from './Fetch'
export const ExperienceRepository = {
    CreateExperience: async (model) => {
        return Fetch.Post('/Experiences/create', model).then(response => {
            return response;
        })
    },
    GetExperiencesByPerson: async (page, limit) => {
        return Fetch.Get(`/Experiences/${page}/${limit}`).then(response => {
            return response;
        })
    }
}
