import axios from 'axios';

const API_KEY =process.env.REACT_APP_API_KEY;
const BASE_URL ='https://api.api-ninjas.com/v1/cocktail';

export interface Cocktail {
    name: string;
    category: string;
    alcoholic: string;
    glass: string;
    instructions: string;
    ingredients: string[];
    imageUrl?: string;
}

export const getCocktails = async (
    name: string,
    category?: string,
    alcoholic?: string
): Promise<Cocktail[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { 'X-Api-Key': API_KEY },
            params: {
                name,
                category,
                alcoholic
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cocktail data: ", error);
        return [];
    }
};

