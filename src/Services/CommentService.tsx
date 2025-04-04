import axios from "axios";
import { CommentPost } from "../Models/Comment";
import { handleError } from "../Helper/ErrorHandler";

const api = "http://localhost:5176/api/comment/";

export const commentPostAPI = async(title: string, content: string, symbol: string) => {
    try {
        const data = await axios.post<CommentPost>(api+`${symbol}`, {
            title: title,
            content: content,
        })
        return data;
    } catch (error) {
        handleError(error);
    }
}