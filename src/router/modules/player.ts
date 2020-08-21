import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

const playerRouter: RouteConfig = {
  path: "/players",
  name: "Player",
  redirect: "/players/list",
  meta: {
    title: "playerMgt", // i18n 信息需要额外处理
    icon: "peoples"
  },
  component: Layout,
  children: [
    {
      path: "list",
      name: "PlayerList",
      meta: {
        title: "playerList",
        icon: "players"
      },
      component: () =>
        import(/* webpackChunkName: "player-list" */ "@/views/player/list.vue")
    },
    {
      path: "create",
      component: () => import("@/views/player/create.vue"),
      name: "CreatePlayer",
      meta: {
        title: "createPlayer",
        icon: "edit"
      }
    },
    {
      path: "update/:id(\\d+)",
      component: () => import("@/views/player/update.vue"),
      name: "UpdatePlayer",
      meta: {
        title: "updatePlayer",
        // tags 页签有多个，不应该缓存
        noCache: true,
        // 左侧导航菜单相关激活 url
        activeMenu: "/players/list",
        // 左侧导航菜单不需要显示
        hidden: true
      }
    }
  ]
};

export default playerRouter;
