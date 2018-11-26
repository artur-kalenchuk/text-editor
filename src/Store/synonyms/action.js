import 'whatwg-fetch';
import {ACTIONS, synonymsApi} from '../../constants';

const processResult = (response) => {
    if (!response || !response.ok) {
        throw response;
    }
    switch (response.status) {
        case 200:
        case 201:
            return (response.headers.get('Content-Type').indexOf('text/plain') === -1)
                ? response.json()
                : response.text();
        default:
            throw response;
    }
}

const setCurrentLoading = (loading = true) => ({
    type: ACTIONS.synonyms.setLoading,
    loading,
});
const setCurrent = synonyms => ({
    type: ACTIONS.synonyms.set,
    payload: synonyms,
});

const get = (word) => {
    return async (dispatch) => {
        dispatch(setCurrentLoading());
        let responseResult = null;
        const params = {
            method: 'get',
            body: null,
            cache: 'no-cache',
            mode: 'cors'
        };
        if (word !== '') {
            try {
                const response = await fetch(`${synonymsApi}${word}`, params);
                const responseResult = await processResult(response);
                dispatch(setCurrent(responseResult.slice(0, 10)));
            } catch (e) {
                dispatch(setCurrentLoading(false));
            }
            return responseResult;
        }
        // When word is empty string need to set empty list of synonyms
        dispatch(setCurrent([]));
        // Action should always return promise.
        return Promise.resolve([])
    };
};


export default {
    get
};
