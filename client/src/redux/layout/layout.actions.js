import {REMOVE_ALERT, SET_ALERT} from "./layout.actionTypes";
import {v4} from 'uuid';

let setAlert = (message,color) => {
    return (dispatch) => {
        let id = v4();
        try {
            dispatch({type : SET_ALERT , payload : {message , color, id}});
            setTimeout(() => {
                dispatch({type : REMOVE_ALERT , payload: {id}});
            } , 3000);
        }
        catch (error) {
            console.error(error);
        }
    }
};
export {setAlert};
