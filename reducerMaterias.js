import * as actions from '../Actions/ActionTypes'

const initialState = {
    materias: [],
    materiasPrueba:{},
    materia: [], //aera un {}
    isProcessing: false,
    error: null
};
  
export default function materiaReducer(state = initialState, action) {
    switch (action.type) {
        case actions.MATERIAS_GET_ALL_INIT:
           
            return {...state,                
                isProcessing: action.payload 
            }
        case actions.MATERIAS_GET_ALL_SUCCESS:

            return {...state,                
                isProcessing: false,
                materiasPrueba: action.payload
            }
        case actions.MATERIAS_GET_ALL_ERROR:
            return {...state,                
                isProcessing: false,
                error: action.payload
            }


        case actions.MATERIAS_GET_BY_USER_INIT:
            return {...state,                
                isProcessing: action.payload 
            }
        case actions.MATERIAS_GET_BY_USER_SUCCESS:
            return {...state,                
                isProcessing: false,
                materias: action.payload
            }
        case actions.MATERIAS_GET_BY_USER_ERROR:
            return {...state,                
                isProcessing: false,
                error: action.payload
            }

        
        case actions.MATERIA_GET_BY_ID_INIT:
            return {...state,                
                isProcessing: action.payload 
            }
        case actions.MATERIA_GET_BY_ID_SUCCESS:
            return {...state,                
                isProcessing: false,
                materia: action.payload
            }
        case actions.MATERIA_GET_BY_ID_ERROR:
            return {...state,                
                isProcessing: false,
                error: action.payload
            }
        default:
            return state;
    }
}
