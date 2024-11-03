import { createContext } from "react";

type ModalContextType = true | false;

const ModalContext = createContext<ModalContextType>(false);