import { Category } from '../types/Category';
import {axiosInstance} from './servicesConfig';

export const CategoriesService = {

    async getCategories(): Promise<Category[]> {
        try {
        const response = await axiosInstance.get<Category[]>('/categories');
        return response.data;
        } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
        }
    },
}