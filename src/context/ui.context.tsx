import React, { FC, useMemo, useReducer, ReactNode } from 'react';
import { getTokenData } from 'api/utils/get-token';

export interface State {
	loginData: {} | null;
}

const initialState = {
	// isAuthorized: getToken(),
	loginData: getTokenData()
};

type Action = {
	type: 'LOGIN_DATA';
};

export const UIContext = React.createContext<State | any>(initialState);
UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
	switch (action.type) {
		case 'LOGIN_DATA': {
			return {
				...state,
				loginData: getTokenData()
			};
		}
	}
}

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);
	const userlogin = () => dispatch({ type: 'LOGIN_DATA' });

	const value = useMemo(() => {
		userlogin;
	}, [state]);

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
	const context = React.useContext(UIContext);
	if (context === undefined) {
		throw new Error(`useUI must be used within a UIProvider`);
	}
	return context;
};

// export const ManagedUIContext: React.FC = (children) => {
// 	<UIProvider>{children}</UIProvider>;
// };

// export const ManagedUIContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	return <UIProvider>{children}</UIProvider>;
// };
