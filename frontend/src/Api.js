import axios from 'axios';
import{handleError} from './utils';

export const createBlog = async(blog)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}blog/create`, blog, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            },
        });
        return response.data;
    }catch(err){
        return handleError('error using creating blog..');
    }
}
export const fetchBlog = async()=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}blog/get`, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            },

        });
        return response.data.data;

    }catch(err){
        return handleError('error using fetching blog..');
    }
}

export const updateUsers = async(id, blog)=>{
    try{
        const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}blog/update/${id}`, blog, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        } );
        return response.data;
    }catch(err){
        return handleError('error using updateing blog..');
    }
}
export const deleteUsers = async(id)=>{
    try{
        const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}blog/delete/${id}`, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        } );
        return response.data;
    }catch(err){
        return handleError('error using deleting blog..');
    }
}
