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
        try {
            const response = await fetch(`${synonymsApi}${word}`, params);
            console.log(response);
            const responseResult = await processResult(response);
            dispatch(setCurrent(responseResult.slice(0, 10)));
        } catch (e) {
            dispatch(setCurrentLoading(false));
        }
        return responseResult;
    };
};


export default {
    get
};
