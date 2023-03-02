import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface ISelectYearContextProps {
    year: string,
    setYear: (year: string) => void;
}

export const SelectYearContext = createContext({} as ISelectYearContextProps);

interface ISelectYearProviderProps {
    children: ReactNode
}

export const useSelectYearContext = () => {
    return useContext(SelectYearContext);
}

export const SelectYearProvider = ({ children }: ISelectYearProviderProps) => {
    
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());

    return (
        <SelectYearContext.Provider value={{year, setYear}}>
            {children}
        </SelectYearContext.Provider>
    )
}