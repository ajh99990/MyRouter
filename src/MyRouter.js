let Vue;
class MyRouter {
    constructor(routes) {
        this.routes = routes;
        this.routMap = {};
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }

    init() {
        //创建路由地图
        this.createRouteMap();
        //监听hashchange事件
        window.addEventListener("hashchange", this.onHashChange.bind(this));
        window.addEventListener("load", this.onHashChange.bind(this));
        //创建组件
        this.createComponent();
    }

    createRouteMap() {
        this.routes.routes.forEach(element => {
            this.routMap[element.path] = element
        })
    }

    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/';
    }

    createComponent() {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default)
            },
        })

        Vue.component('router-view', {
            render: (h) => {
                return h(this.routMap[this.app.current].component);
            }
        })
    }

    static install(_Vue) {
        Vue = _Vue;
        Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router;
                    Vue.prototype.$router.init();
                }
            }
        })
    }

}

export default MyRouter;