import { useEffect, useState, useRef, RefObject } from "react";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (object:{[key:string]:unknown}) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

const isError = (value:any): value is Error => value?.message
export const errorBox = ({error}:{error:unknown}) =>{
  if(isError(error)){
    return error.message
  }
  return null;
}


export const useClickOutside= (ref: RefObject<HTMLElement>,parent:RefObject<HTMLElement>, handler: Function) =>{
  useEffect(() => {
      const listener = (event: MouseEvent) => {
          if(parent && parent.current && parent.current.contains(event.target as HTMLElement)  ){
            return
          }
          if(!ref.current || ref.current.contains(event.target as HTMLElement) ){
            return
          }
          handler(event)
      }
      document.addEventListener('click',listener)
      return () => {
          document.removeEventListener('click', listener)
      }
  }, [ref,parent, handler])
}  