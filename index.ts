function flatRecursive(data: Array<any>, searchKey: string, values: Array<any> = []) {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] === "object" && !Array.isArray(data[i])) {
                for (let [key, value] of Object.entries(data[`${i}`])) {
                    if (key === searchKey) {
                        if (value) {
                            if (Array.isArray(value) && value.length > 0) {
                                value = value.map((x: any) => ({...x}))
                            }
                            if (typeof value === "object" && !Array.isArray(value)) {
                                values.push({...value});
                            } else if (Array.isArray(value)) {
                                values.push(...value);
                            } else {
                                values.push(value);
                            }
                        }
                    }
                    if (typeof value === "object" && value) {
                        this.flatRecursive(value, searchKey, values);
                    }
                }
            }
        }
    }
    return values;
}