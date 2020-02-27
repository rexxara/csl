import { useReducer, useMemo, useCallback } from 'react'
import STATE_MAP from './static.jsx'

const useMethods = (initialState, methods) => {
    const [value, dispatch] = useReducer(
        (state, action) => {
            const { type, payload } = action
            const fn = methods[type]
            return fn(state, payload)
        },
        initialState
    )
    const boundMethods = useMemo(
        () => {
            let mapedmethods = {}
            Object.getOwnPropertyNames(methods).forEach((key) => {
                mapedmethods[key] = (...args) => dispatch({ type: key, payload: args })
            })
            return mapedmethods
        },
        [methods]
    )
    return [value, boundMethods]
}
const useArray = (initialValue = []) => {
    const arrayMethods = {
        push(state, item) {
            return state.concat(item)
        },
        pop(state) {
            return state.slice(0, -1)
        },
        splice(state, [start, count]) {
            let newState=[].concat(state)
            newState.splice(start, count)
            return newState
        },
        empty() {
            return []
        }
    }
    return useMethods(initialValue, arrayMethods)
}
// export const useNumber = (initialValue = 0) => {
//     const numberMethods = {
//         increment(state) {
//             return state + 1
//         },
//         decrement(state) {
//             return state - 1
//         }
//     }
//     return useMethods(initialValue, numberMethods)
// }
const useStateMapState = () => {
    const initialValue = STATE_MAP.loading
    const stateMethods = {
        success() {
            return STATE_MAP.loaded
        },
        failed() {
            return STATE_MAP.failed
        }

    }
    return useMethods(initialValue, stateMethods)
}
export const useTaskPending = task => {
    const [state, { success, failed }] = useStateMapState()
    const taskWithPending = useCallback(
        async (...args) => {
            try {
                const result = await task(...args)
                success()
                return result
            } catch (error) {
                failed()
                return error
            }
        },
        [task, success, failed]
    )
    return [taskWithPending, state]
}
export default useArray