import request from "@/utils/request";

export const getPlayers = (params: any) => {
  return request({
    url: "/players",
    method: "get",
    params
  });
};

export const getPlayer = (id: number, params: any) => {
  return request({
    url: `/players/${id}`,
    method: "get",
    params
  });
};

export const createPlayer = (params: any) => {
  return request({
    url: "/players",
    method: "post",
    params
  });
};

export const updatePlayer = (id: number, params: any) => {
  return request({
    url: `/players/${id}`,
    method: "put",
    params
  });
};

export const deletePlayer = (id: number, params: any) => {
  return request({
    url: `/players/${id}`,
    method: "delete",
    params
  });
};
