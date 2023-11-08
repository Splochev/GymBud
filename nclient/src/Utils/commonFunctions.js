import { API_URL, DEFAULT_API_URL } from "@env";
import { Platform } from 'react-native';

export const getHostUrl = () =>{
    return Platform.OS === 'ios' ? DEFAULT_API_URL : API_URL;
};