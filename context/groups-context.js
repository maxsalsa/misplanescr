"use client";
import { createContext, useContext } from "react";
const GroupsContext = createContext({ groups: [] });
export const GroupsProvider = ({ children }) => <GroupsContext.Provider value={{}}>{children}</GroupsContext.Provider>;
export const useGroups = () => useContext(GroupsContext);