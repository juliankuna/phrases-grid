import { Phrase } from '../types/Phrase';
import {axiosInstance} from './servicesConfig';

export const PhrasesService = {

    async getPhrases(): Promise<Phrase[]> {
        try {
        console.log("trolo ", axiosInstance.defaults.baseURL);
        const response = await axiosInstance.get<Phrase[]>('/phrases');
        return response.data;
        } catch (error) {
        console.error('Error fetching phrases:', error);
        throw error;
        }
    },
}