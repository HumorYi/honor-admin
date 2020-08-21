import { Request, Response } from "express";
import faker from "faker";

import { Player, Hero } from "../src/api/types";
import { heros } from "./heros";

faker.locale = "zh_CN";

// 模拟玩家数据
const playerCount = 100;
const players: Player[] = [];

for (let i = 1; i <= playerCount; i++) {
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
    wanttoplay: genWanttoplay() // 想玩英雄
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

function filterOption(list: any[], filter: { [key: string]: any }): any[] {
  // 所有筛选项都没有值，代表获取全部
  if (Object.keys(filter).every((key: string) => !filter[key])) {
    return list;
  }

  return list.filter((item: { [key: string]: any }) => {
    for (const key in filter) {
      const filterValue = filter[key];
      if (filterValue && item[key].includes(filterValue)) {
        return true;
      }
    }

    return false;
  });
}

function genResContentOfList(
  total: number,
  list: any[],
  code = 20000
): { code: number; data: { total: number; list: any[] } } {
  return {
    code,
    data: {
      total,
      list
    }
  };
}

function findPlayerById(id: number) {
  return players.find((item: Player) => item.id === id);
}

export const getPlayers = (req: Request, res: Response) => {
  const { accountname, nickname, page = 1, limit = 10 } = req.query;

  // 筛选
  let filterList = filterOption(players, { accountname, nickname });

  // 分页
  const pageList = filterPaginate(filterList, page as number, limit as number);

  res.json(genResContentOfList(filterList.length, pageList));
};

export const createPlayer = (req: Request, res: Response) => {
  const { player } = req.body;

  res.json({
    code: 20000,
    data: {
      player
    }
  });
};

export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params;

  const player = findPlayerById(Number(id));
  if (player) {
    return res.json({
      code: 20000,
      data: {
        player
      }
    });
  }

  res.json({
    code: 70001,
    message: "player not found"
  });
};

export const updatePlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  const { player } = req.body;

  const findPlayer = findPlayerById(Number(id));

  if (findPlayer) {
    for (const key in player) {
      if (Object.prototype.hasOwnProperty.call(findPlayer, key)) {
        findPlayer[key] = player[key];
      }
    }

    res.json({
      code: 20000,
      data: {
        player
      }
    });
  }

  res.json({
    code: 70001,
    message: "player not found"
  });
};

export const deletePlayer = (req: Request, res: Response) => {
  // const { id } = req.params;

  res.json({
    code: 20000
  });
};
