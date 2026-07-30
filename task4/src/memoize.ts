const memoize = (func: Function) => {
    const map = new Map();
    return (...args: Array<unknown>) =>{
        let key = args.join(",");
        if(!map.has(key)){
            let value = func(...args);
            map.set(key,value);
        }
        return map.get(key);
    };
};