export function updateObject<T>(obj1: T, obj2: Partial<T>): T {
    for (const prop in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
            const value2 = obj2[prop as keyof Partial<T>];
            const value1 = obj1[prop as keyof T];
            if (
                typeof value2 === "object" &&
                value2 !== null &&
                !Array.isArray(value2)
            ) {
                // Recursively update nested objects
                obj1[prop as keyof T] = updateObject(value1, value2 as any);
            } else if (Array.isArray(value2)) {
                // Update arrays
                if (Array.isArray(value1) && value1.length === value2.length) {
                    for (let i = 0; i < value2.length; i++) {
                        if (
                            typeof value2[i] === "object" &&
                            value2[i] !== null &&
                            !Array.isArray(value2[i])
                        ) {
                            // Recursively update nested objects inside the array
                            updateObject(value1[i], value2[i] as any);
                        } else if (value1[i] !== value2[i]) {
                            // Update array element if values are different
                            value1[i] = value2[i];
                        }
                    }
                } else {
                    // Replace entire array if they are different
                    obj1[prop as keyof T] = value2 as any;
                }
            } else if (value1 !== value2) {
                // Update only if the values are different
                obj1[prop as keyof T] = value2 as any;
            }
        }
    }
    return obj1;
}
