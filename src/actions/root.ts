import { Action } from "../types/types"
import { AppState, AppDispatch } from "../store/store"

export const stateFetched = (state: AppState): Action => ({
    type: 'root/stateFetched',
    payload: state
})

export const stateFetchedAsync = () => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.loadKey('state')
            .then((state) => dispatch(stateFetched(state)))
    }
}