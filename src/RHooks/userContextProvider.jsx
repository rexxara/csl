import React, { useMemo ,useEffect} from 'react'
import useUserList from './services'

export const UserListContext = React.createContext()
export default function ({ children }) {
    const [users, methods] = useUserList(['asass'])
    // useEffect(() => {
    //     methods.getList()
    // }, [])
    const contextValue = useMemo(
        () => ({ users, ...methods }),
        [users, ...Object.values(methods)]
    )
    return (
        <UserListContext.Provider value={contextValue}>
            {children}
        </UserListContext.Provider>
    )
}