import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './debounce.hook';

export interface ICustomOptions {
    threshold?: number;
    marginBottom?: number;
    delay?: number;
}

export const useIntersectionAnimator = <TRef extends Element | null>(customOptions: ICustomOptions = {}) => {
    const [isAnimated, setIsAnimated] = useState(false);
    const elementRef = useRef<TRef | Element | null>(null);
    const debounce = useDebounce(() => setIsAnimated(true), customOptions?.delay || 0);
    const options = {
        threshold: customOptions?.threshold || 0,
        rootMargin: `0px 0px ${customOptions?.marginBottom || -20}px 0px`
    };

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    debounce.trigger();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(elementRef.current as Element);

        return () => observer.disconnect();
    }, []);

    const setRef = (ref: TRef) => {
        elementRef.current = ref;
    };

    return { isAnimated, setRef };
};
