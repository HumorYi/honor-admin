import { Request, Response } from "express";
import faker from "faker";

import { Player, Hero } from "../src/api/types";
import { heros } from "./heros";

faker.locale = "zh_CN";

// 模拟玩家数据
const playerCount = 100;
const players: Player[] = [];

for (let i = 0; i < playerCount; i++) {
  players.push({
    id: i,
    accountname: faker.name.findName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    level: faker.random.number(30), // ⽤户等级
    exp: faker.random.number(100000), // ⽤户经验值
    rank: faker.random.number(200), // 排位赛段位
    bravepoints: faker.random.number(1000), // 勇者积分
    winningstreak: faker.random.number(10), // 连胜场次
    wanttoplay: genWanttoplay(), // 想玩英雄
  });
}

function genWanttoplay(): Hero[] {
  const wanttoplay: Set<Hero> = new Set();
  const count = 3;

  while (wanttoplay.size < count) {
    wanttoplay.add(heros[faker.random.number(9)]);
  }

  return Array.from(wanttoplay);
}

function filterPaginate(list: any[], page: number, limit: number): any[] {
  const end = page * limit;
  const start = end - limit;

  return list.filter((item: any, i: number) => i >= start && i < end);
}

function filterKeyword(list: any[], key: string, keyword: string): any[] {
  return list.filter(
    (item: { [key: string]: any }) =>
      keyword && item[key] && item[key].includes(keyword)
  );
}

function genResContentOfList(
  total: number,
  list: any[],
  code = 0
): { code: number; data: { total: number; list: any[] } } {
  return {
    code,
    data: {
      total,
      list,
    },
  };
}

export const getPlayers = (req: Request, res: Response) => {
  const { accountname, page = 1, limit = 10 } = req.query;

  // 筛选
  let filterList = filterKeyword(players, "accountname", accountname);

  // 分页
  const pageList = filterPaginate(filterList, page, limit);

  res.json(genResContentOfList(filterList.length, pageList));
};
