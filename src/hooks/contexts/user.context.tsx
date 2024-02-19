import { createContext, useState } from 'react';

const UserContext = createContext<any>({
    user: '',
    updateUser: () => {},
})

export function UserProvider({ children }: any) {
    const [user, setUser] = useState('');
  
    function updateUser(myUser: any) {
        setUser(myUser)
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
