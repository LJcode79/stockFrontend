import { CompanySearch } from "../company";
import axios, { isAxiosError } from 'axios';

interface SearchResponse {
    data: CompanySearch[];

}

export const searchCompanies = async (query: string) => {
    try{
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data
    }
    catch(error) {
        if(isAxiosError(error))
        {
            console.log("unexpected message: ", error.message);
            return "an unexpected error has occurred";
        }
    }
}