// Data types
export interface ChatData {
    user: string
    time: string
    message: string
    lineno: number
}

export type InfoData = ChatData;

export interface Coordinate {
    x: number
    y: number
}
export interface PlanetData {
    coordinate: Coordinate
}

export interface PlayerData {
    name: string
}

// States
export interface RootState {
    servername: string
    maxplayers: string
    isNotifyEnabled: boolean
}
export interface LogState {
    logs: Array<string>;
    chats: Array<ChatData>;
    infos: Array<InfoData>;
    planets: Array<PlanetData>
}

export interface PlayerState {
    players: Set<PlayerData>
}

export interface CombinedRootState extends RootState {
    logStore: LogState;
}

// Mutation types

export const PUSH_PLANET = 'PUSH_PLANET';
export const POP_PLANET = 'POP_PLANET';

export const PUSH_CHAT = 'PUSH_CHAT';

export const PUSH_INFO = 'PUSH_INFO';

export const PUSH_LOG = 'PUSH_LOG';
export const PARSE_LOG = 'PARSE_LOG';

export const UPDATE_PLYAERS = 'UPDATE_PLAYERS';
export const PUSH_PLYAER = 'PUSH_PLYAER';
export const POP_PLYAER = 'POP_PLYAER';

export const REQUEST_NOTIFICATION_PERMISSION = 'REQUEST_NOTIFICATION_PERMISSION';
export const UPDATE_NOTIFICATION_PERMISSION = 'UPDATE_NOTIFICATION_PERMISSION';

// Action payloads
export interface LogParseActionPayload {
    data: string,
    isInit?: boolean,
}

// Mutations payloads
export interface LogPushMutationPayload {
    data: string
}

export interface ChatPushMutationPayload {
    data: ChatData
}

export interface InfoPushMutationPayload {
    data: InfoData
}

export interface PlanetPushMutationPayload {
    data: PlanetData
}

export interface PlanetPopMutationPayload {
    data: PlanetData
}

export interface PlayerUpdateMutationPayload {
    data: Set<PlayerData>
}
export interface PlayerPushMutationPayload {
    data: PlayerData
}
export type PlayerPopMutationPayload = PlayerPushMutationPayload;

// Getters

export interface LogGetters {

}

// Utils

export type mapGettersMixin < T > = { [K in keyof T]: () => T[K] };

// Server response

export interface PlayerResponse {
    index: number,
    name: string,
    duration: number
    score: number
}
