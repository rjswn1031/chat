"use client"

import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext } from "react";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7010/chat', // 여기에서 기본 설정을 지정할 수 있습니다.
});
const AxiosContext = createContext<AxiosInstance|null>(null);

export const AxiosProvider = ({children}:{children: ReactNode}) => {
    return (
    <AxiosContext.Provider value={axiosInstance}>
        {children}
    </AxiosContext.Provider>
    )
}

export const useAxios = () => {
    const context = useContext(AxiosContext);
    if (context===undefined) {
      throw new Error('useAxios must be used within an AxiosProvider');
    }
    return context;
};