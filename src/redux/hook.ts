import { useSelector as useReduxSelector,TypedUseSelectorHook,useDispatch } from "react-redux";
import { RootState , AppDispatch } from "./store";

export const useSelector:TypedUseSelectorHook<RootState> = useReduxSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
/// 不用每次都在新元件中調用store rootstate