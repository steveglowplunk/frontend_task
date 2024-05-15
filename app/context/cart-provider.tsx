"use client";

import { Dispatch, SetStateAction, createContext, use, useContext, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode;
}

interface ContextProps {
    // code: string;
    // setCode: Dispatch<SetStateAction<string>>;
    name: string[];
    setName: Dispatch<SetStateAction<string[]>>;
}

const CartContext = createContext<ContextProps>({
    // code: "",
    // setCode: (): string => '',
    name: [],
    setName: (): string[] => []
});

export const CartProvider = ({ children }: CartProviderProps) => {
    const [code, setCode] = useState<string>("");
    const [name, setName] = useState<string[]>([]);
    return (
        <CartContext.Provider value={{ name, setName }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);