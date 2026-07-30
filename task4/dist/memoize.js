const memoize = (func) => {
    const map = new Map();
    return (...args) => {
        let key = args.join(",");
        if (!map.has(key)) {
            let value = func(...args);
            map.set(key, value);
        }
        return map.get(key);
    };
};
export {};
//# sourceMappingURL=memoize.js.map