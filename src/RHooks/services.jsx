
import { useCallback} from 'react'
import useArray, { useTaskPending } from './hookUtils'



const useUserList = (iniValue) => {
    const [users, { push, pop, splice, empty }] = useArray(iniValue)
    const [fetchUser, loading] = useTaskPending(() => new Promise((res, rej) => {
        setTimeout(() => {
            res()
            push(...[0, 1, 2, 3, 4])
        }, 2000)
    }))
    const remove = useCallback(
        user => {
            const index = users.findIndex(user)
            splice(index, 1)
        }, 
        [users, splice]
    );
    return [users, { getList: fetchUser, loading, addUser: push, deleteUser: remove }];
}
export default useUserList