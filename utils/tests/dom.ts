/**
 * Utility to override (potentially read-only) object properties (i.e. clientHeight on dom nodes)
 * @param object target object
 * @param properties object of property names/and values to override. If the property does not
 * exist on the target object, it will be created
 * @returns mutated object with new property definitions
 */
export const overrideProperties = (object: any, properties: Record<string, any>) => {
    for (const [name, value] of Object.entries(properties)) {
        try {
            Object.defineProperty(object, name, {
                configurable: true,
                enumerable: true,
                get() {
                    return value;
                },
            });
        } catch (e) {
            console.error(e);
            // if we can't re-define the prop, just set it
            object[name] = value;
        }
    }
    return object;
};
