import { createClient } from "redis";
import { redisUrl } from "../constant.js";

function socketInfoPrefix(key) {
    return "socket-info:" + key
}

function roomPrefix(key) {
    return "room:" + key
}

export async function createRedisClient() {
    const redisClient = createClient({ url: redisUrl });
    redisClient.on('error', err => console.log('Redis Client Error', err));
    await redisClient.connect();

    return redisClient;
}

export async function getUserID(redisClient, socketID) {
    return redisClient.get(socketInfoPrefix(socketID));
}

export async function saveSocketToUserID(redisClient, socketID, userID) {
    redisClient.set(socketInfoPrefix(socketID), userID);
}

export async function deleteUserID(redisClient, socketID) {
    return redisClient.del(socketInfoPrefix(socketID));
}

export async function getRoomInfo(redisClient, roomID) {
    return redisClient.get(roomPrefix(roomID))
}

export async function createRoomInfo(redisClient, roomID, roomInfo) {
    redisClient.set(roomPrefix(roomID), JSON.stringify(roomInfo));
}

export async function deleteRoomInfo(redisClient, roomID) {
    redisClient.del(roomPrefix(roomID));
}