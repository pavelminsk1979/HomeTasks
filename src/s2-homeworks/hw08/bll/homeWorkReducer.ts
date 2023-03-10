import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            if(action.payload==='up'){
                return state.map(e=>({...e})).sort((a,b)=>a.name<b.name?-1:1)
            } else {
                return state.map(e=>({...e})).sort((a,b)=>a.name<b.name?-1:1).reverse()
            }

             // need to fix
        }
        case 'check': {

            return state.filter(e=>e.age>18) // need to fix
        }
        default:
            return state
    }
}
