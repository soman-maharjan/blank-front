import * as ActionTypes from '../ActionTypes';
import { LoadProfileService } from '../services/ProfileService';

export const LoadProfileAction = () => {
    return (dispatch) => {
        Promise.resolve(LoadProfileService()).then(res => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: ActionTypes.LOAD_PROFILE_SUCCESS, res });
            } else {
                dispatch({ type: ActionTypes.LOAD_PROFILE_ERROR, res });
            }
        })
    }
}