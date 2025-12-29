import React, { createContext, useContext } from 'react';

const ToggleGroupNameContext = createContext<string | undefined>(undefined);

export function GroupNameProvider({ children, name }: { children: React.ReactNode; name: string }) {
    return <ToggleGroupNameContext.Provider value={name}>{children}</ToggleGroupNameContext.Provider>;
}

export const useGroupName = () => useContext(ToggleGroupNameContext);
