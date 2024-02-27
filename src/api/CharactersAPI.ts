import { AxiosResponse } from 'axios';
import instanse from './AxiosInstance';

class CharactersAPI {
    public static getCharacters(): Promise<AxiosResponse> {
        return instanse.get('/characters');
    }
}

export default CharactersAPI;
