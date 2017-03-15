import { postObject } from '../socket/actionGenerators';

export const searchTwitter = (searchTerm) => {
    return postObject({
        messageType: 'toServerSearchTwitter',
        searchTerm });
};