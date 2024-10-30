import { RefObject, useEffect, useRef } from "react";

// https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API
export const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  isCanLoad: boolean,
  isLoading: boolean,
  callback: () => void) => {

  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    if (isLoading)
      return;
    if (observer.current)
      observer.current.disconnect();
    
    const cllbck: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting && isCanLoad) {
          callback();
        }
    };

    observer.current = new IntersectionObserver(cllbck);
    
    if (ref.current) {
      observer.current.observe(ref.current);
    }

  }, [isLoading, callback, isCanLoad, ref]);
};
