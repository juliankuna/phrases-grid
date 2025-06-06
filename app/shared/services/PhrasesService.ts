import { Phrase } from '../types/Phrase';
import {axiosInstance} from './servicesConfig';

export const PhrasesService = {

    async getPhrases(): Promise<Phrase[]> {
        try {
        const response = await axiosInstance.get<Phrase[]>('/phrases');
        return response.data;
        } catch (error) {
        console.error('Error fetching phrases:', error);
        throw error;
        }
    },
}