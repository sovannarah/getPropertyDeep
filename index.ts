function flatRecursive(a: Array<any>, searchKey: string, t: Array<any>, entityId: string) {
    if (Array.isArray(a)) {
        for (let i = 0; i < a.length; i++) {
            if (a[i].profile && !entityId) {
                entityId = a[i]._id;
            }
            if (typeof a[i] === "object" && !Array.isArray(a[i])) {
                for (let [key, value] of Object.entries(a[`${i}`])) {
                    if (key === searchKey) {
                        if (value) {
                            if (Array.isArray(value) && value.length > 0) {
                                value = value.map((x: any) => ({...x, entityId}))
                            }
                            if (typeof value === "object" && !Array.isArray(value)) {
                                t.push({...value});
                            } else if (Array.isArray(value)) {
                                t.push(...value);
                            } else {
                                t.push(value);
                            }
                        }
                    }
                    if (typeof value === "object" && value) {
                        this.flatRecursive(value, searchKey, t, entityId);
                    }
                }
            }
        }
    }
    return t;
}