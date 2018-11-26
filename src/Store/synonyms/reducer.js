import {ACTIONS} from '../../constants';

const initialState = {
    loading: false,
    data: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.synonyms.setLoading: {
            return {
                ...state,
                ...{
                    ...state.data,
                    loading: action.loading,
                },
            };
        }

        case ACTIONS.synonyms.set: {
            return {
                ...state,
                ...{
                    loading: false,
                    data: action.payload,
                },
            };
        }

        default: {
            return state;
        }
    }
};

export default reducer;
