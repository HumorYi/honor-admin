import { Player } from "@/api/types";

export const getDefaultPlayer = (): Player => {
  const player: Player = {
    id: 0,
    accountname: "",
    nickname: "",
    avatar: "",
    level: 0, // ⽤户等级
    exp: 0, // ⽤户经验值
    rank: 0, // 排位赛段位
    bravepoints: 0, // 勇者积分
    winningstreak: 0, // 连胜场次
    wanttoplay: [] // 想玩英雄
  };

  return player;
};
