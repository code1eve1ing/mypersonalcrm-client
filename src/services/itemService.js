import api from './api';

// TODO: toastigy on erorr, set proper service
export const bulkSave = async (data) => {
    try {
        const response = await api.post('/items/bulk', data);
        return response.data; // success response
    } catch (error) {
        const errMsg =
            error.response?.data?.error || 'Something went wrong while saving items';
        throw new Error(errMsg);
    }
}

export const getAllItems = async (data) => {
    try {
        const response = await api.get('/items', data);
        return response.data; // success response
    } catch (error) {
        const errMsg =
            error.response?.data?.error || 'Something went wrong while saving items';
        throw new Error(errMsg);
    }
}

