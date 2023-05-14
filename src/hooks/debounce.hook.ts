import { useEffect, useState } from 'react';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

export const useDebounce = (callback: Function, timeToDebounce = 300) => {
    const [debounce$] = useState(() => new Subject());

    useEffect(() => {
        const subscription = debounce$.pipe(
            debounceTime(timeToDebounce),
            distinctUntilChanged(),
        ).subscribe(callback as any);

        return () => subscription.unsubscribe();
    }, []);

    const trigger = (value?: any) => {
        const nextValue = value ?? Math.random();

        debounce$.next(nextValue);
    };

    return { trigger };
};
