import { useRef, useEffect, useState, DependencyList } from 'react';
import { eq, isEqual, isEqualWith } from 'lodash';

/**
 * `useDeepValueEqualityMemo` will only recompute its memoized value if one of the `deps`
 * has changed.
 *
 * Unlike `useMemo`, the change is determined not by reference, but by
 * deep value equality using `_.isEqual` under the hood.
 *
 * (A good example of this is kind of behavior are `style={{...}}`
 * props in components: only changes to individual style properties cause a re-render, whereas
 * normally passing an object literal would always cause an update because the reference
 * continually changes).
 */
export function useDeepValueEqualityMemo<T>(factory: () => T, deps?: DependencyList) {
    const lastDeps = useRef(deps);
    const [value, setValue] = useState(factory());

    useEffect(() => {
        if (!isEqual(deps, lastDeps.current)) {
            lastDeps.current = deps;
            setValue(factory());
        }
    }, [deps, factory]);

    return value;
}

/**
 * `useShallowValueEqualityMemo` will only recompute its memoized value if one of the `deps`
 * has changed.
 *
 * Unlike `useMemo`, the change is determined only partially by reference. Comparisons for
 * atomic values (strings, numbers, etc) are done by value equality using `_.isEqual`.
 * Comparisons for container values (arrays, objects, maps, etc) are done by value for the
 * containers themselves, but their contents are compared by reference.
 *
 * The main use case for this is preventing re-renders when passing un-memoized arrays as props.
 * We want to ignore the changing reference of the array container, but still compare the
 * array contents by reference.
 *
 * (Note that it's currently not possible to pass a dependency list that changes size to
 * `useMemo` directly. This would solve the array contents problem, but since we can't do it
 * we need to use this hook instead.)
 */
export function useShallowValueEqualityMemo<T>(factory: () => T, deps?: DependencyList) {
    const lastDeps = useRef(deps);
    const [value, setValue] = useState(factory());

    useEffect(() => {
        if (
            !isEqualWith(deps, lastDeps.current, (...compareArgs) => {
                const lastArg = compareArgs[compareArgs.length - 1];
                if (lastArg === lastDeps.current) {
                    // This means that we're still in the first level of any recursive calls,
                    // otherwise the last argument is a stack that tracks the recursion.
                    //
                    // Use the default value equality for the first level of comparisons.
                    return;
                }

                // use reference equality for all nested container values
                return eq(compareArgs[0], compareArgs[1]);
            })
        ) {
            lastDeps.current = deps;
            setValue(factory());
        }
    }, [deps, factory]);

    return value;
}
