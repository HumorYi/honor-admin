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
    }
  ]
};

export default playerRouter;
