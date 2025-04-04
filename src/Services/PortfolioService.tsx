import axios from "axios";
import { handleError } from "../Helper/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5176/api/portfolio/";

export const portfolioAddApi = async (symbol: string) => {
    try{
        const data = await axios.post<PortfolioPost>(api+`?symbol=${symbol}`);
        return data;
    } catch (error)
    {
        handleError(error);
    }
};

export const portfolioDeleteApi = async (symbol: string) => {
    try{
        const data = await axios.delete<PortfolioPost>(api+`?symbol=${symbol}`);
        return data;
    } catch (error)
    {
        handleError(error);
    }
};

export const portfolioGetApi = async () => {
    try{
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch (error)
    {
        handleError(error);
    }
};