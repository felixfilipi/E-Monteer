import { useRef, useEffect } from 'react'

export const useComponentDidMount = () => {
  const ref: any = useRef(false);
    useEffect(() => {
      ref.current = true
    },[]);
  return ref.current;
};
