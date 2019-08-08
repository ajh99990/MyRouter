import Vue from "vue"
import MyRouter from "./MyRouter"
import Home from "./components/Home"
import News from "./components/News"

Vue.use(MyRouter)

const routes = [
    { path: "/", component: Home }, //首页
    { path: "/news", component: News },//新闻页
]

const router = new MyRouter({
    routes
})

export default router;