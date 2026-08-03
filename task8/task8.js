const error = () => {
    const p = document.createElement("p");
    p.textContent = `Page not found`;
    return p;
};
export class Router {
    pathRegx = {};
    routes;
    constructor() {
        this.routes = new Map();
        this.register("404.html", error);
    }
    register(path, componentFn) {
        if (path.includes(":")) {
            const pathArr = path.split("/");
            const mappedPathArr = pathArr.map((each) => {
                if (!each.includes(":"))
                    return each;
                const param = each.slice(1);
                return `(?<${param}>\\w+)`;
            });
            const pathString = mappedPathArr.join("\\/");
            this.pathRegx["^" + pathString + "$"] = path;
        }
        this.routes.set(path, this.wrapper(componentFn));
    }
    setPath(path) {
        let flag = false;
        Object.keys(this.pathRegx).forEach((each) => {
            const regex = new RegExp(each);
            if (regex.test(path)) {
                const param = regex.exec(path)?.groups;
                const func = this.routes.get(this.pathRegx[each]);
                if (func)
                    func(param);
                flag = true;
            }
        });
        if (flag)
            return;
        if (!this.routes.has(path)) {
            const func = this.routes.get("404.html");
            if (func)
                func();
            return;
        }
        const func = this.routes.get(path);
        if (func)
            func();
    }
    wrapper(componentFn) {
        return (params) => {
            let el = componentFn(params);
            if (!el) {
                el = document.createElement("p");
                el.textContent = `Element not returned from ${componentFn.name} fn`;
            }
            const app = document.querySelector("#app");
            if (!app)
                return;
            app.replaceChildren();
            app.appendChild(el);
        };
    }
    init() {
        const path = window.location.pathname;
        this.setPath(path);
        window.addEventListener("click", (e) => {
            const target = e.target;
            if (!target)
                return;
            if (!("closest" in target))
                return;
            if (typeof target.closest !== "function")
                return;
            const aTag = target.closest("a[href]");
            if (!aTag)
                return;
            e.preventDefault();
            history.pushState({ url: path }, "", aTag.pathname);
            this.setPath(aTag.pathname);
        });
        window.addEventListener("popstate", (e) => {
            const target = e.target;
            if (!target)
                return;
            if (!("location" in target))
                return;
            if (typeof target.location !== "object")
                return;
            const location = target.location;
            if (!location)
                return;
            if (!("pathname" in location))
                return;
            if (typeof location.pathname !== "string")
                return;
            this.setPath(location.pathname);
        });
    }
}
