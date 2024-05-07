import React, { createContext, useState, useContext } from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//maybe add token?

	return (
		<userContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
			{children}
		</userContext.Provider>
	);
};

export const useAuth = () => useContext(userContext);
