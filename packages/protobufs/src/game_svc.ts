/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "";

export enum GameOutcome {
  WHITE_WINS = 0,
  BLACK_WINS = 1,
  TIE = 2,
  KEEP_PLAYING = 3,
  UNRECOGNIZED = -1,
}

export function gameOutcomeFromJSON(object: any): GameOutcome {
  switch (object) {
    case 0:
    case "WHITE_WINS":
      return GameOutcome.WHITE_WINS;
    case 1:
    case "BLACK_WINS":
      return GameOutcome.BLACK_WINS;
    case 2:
    case "TIE":
      return GameOutcome.TIE;
    case 3:
    case "KEEP_PLAYING":
      return GameOutcome.KEEP_PLAYING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameOutcome.UNRECOGNIZED;
  }
}

export function gameOutcomeToJSON(object: GameOutcome): string {
  switch (object) {
    case GameOutcome.WHITE_WINS:
      return "WHITE_WINS";
    case GameOutcome.BLACK_WINS:
      return "BLACK_WINS";
    case GameOutcome.TIE:
      return "TIE";
    case GameOutcome.KEEP_PLAYING:
      return "KEEP_PLAYING";
    case GameOutcome.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GameSettingsMsg {
  time?: number | undefined;
  increment?: number | undefined;
}

export interface GameStateMsg {
  fen: string;
  moveSans: string[];
  outcome: GameOutcome;
  timeLeftWhite?: number | undefined;
  timeLeftBlack?: number | undefined;
  drawAskedBy?: string | undefined;
}

export interface CreateGameRequest {
  whitePlayerId: string;
  blackPlayerId: string;
  settings: GameSettingsMsg | undefined;
}

export interface GameIdMsg {
  gameId: string;
}

export interface GetGameInfoResponse {
  whitePlayerId: string;
  blackPlayerId: string;
  settings: GameSettingsMsg | undefined;
  state: GameStateMsg | undefined;
  whitePlayerUsername?: string | undefined;
  blackPlayerUsername?: string | undefined;
}

export interface MakeMoveRequest {
  gameId: string;
  playerId: string;
  san: string;
}

export interface MakeMoveResponse {
  gameId: string;
  san: string;
  updatedFen: string;
  updatedOutcome: GameOutcome;
  updatedTimeLeft?: number | undefined;
}

export interface AskOrAcceptDrawRequest {
  gameId: string;
  playerId: string;
}

function createBaseGameSettingsMsg(): GameSettingsMsg {
  return { time: undefined, increment: undefined };
}

export const GameSettingsMsg = {
  encode(message: GameSettingsMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.time !== undefined) {
      writer.uint32(8).uint32(message.time);
    }
    if (message.increment !== undefined) {
      writer.uint32(16).uint32(message.increment);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameSettingsMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameSettingsMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.time = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.increment = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameSettingsMsg {
    return {
      time: isSet(object.time) ? globalThis.Number(object.time) : undefined,
      increment: isSet(object.increment) ? globalThis.Number(object.increment) : undefined,
    };
  },

  toJSON(message: GameSettingsMsg): unknown {
    const obj: any = {};
    if (message.time !== undefined) {
      obj.time = Math.round(message.time);
    }
    if (message.increment !== undefined) {
      obj.increment = Math.round(message.increment);
    }
    return obj;
  },

  create(base?: DeepPartial<GameSettingsMsg>): GameSettingsMsg {
    return GameSettingsMsg.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GameSettingsMsg>): GameSettingsMsg {
    const message = createBaseGameSettingsMsg();
    message.time = object.time ?? undefined;
    message.increment = object.increment ?? undefined;
    return message;
  },
};

function createBaseGameStateMsg(): GameStateMsg {
  return {
    fen: "",
    moveSans: [],
    outcome: 0,
    timeLeftWhite: undefined,
    timeLeftBlack: undefined,
    drawAskedBy: undefined,
  };
}

export const GameStateMsg = {
  encode(message: GameStateMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fen !== "") {
      writer.uint32(10).string(message.fen);
    }
    for (const v of message.moveSans) {
      writer.uint32(18).string(v!);
    }
    if (message.outcome !== 0) {
      writer.uint32(24).int32(message.outcome);
    }
    if (message.timeLeftWhite !== undefined) {
      writer.uint32(32).uint32(message.timeLeftWhite);
    }
    if (message.timeLeftBlack !== undefined) {
      writer.uint32(40).uint32(message.timeLeftBlack);
    }
    if (message.drawAskedBy !== undefined) {
      writer.uint32(50).string(message.drawAskedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameStateMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameStateMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fen = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.moveSans.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.outcome = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.timeLeftWhite = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.timeLeftBlack = reader.uint32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.drawAskedBy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameStateMsg {
    return {
      fen: isSet(object.fen) ? globalThis.String(object.fen) : "",
      moveSans: globalThis.Array.isArray(object?.moveSans) ? object.moveSans.map((e: any) => globalThis.String(e)) : [],
      outcome: isSet(object.outcome) ? gameOutcomeFromJSON(object.outcome) : 0,
      timeLeftWhite: isSet(object.timeLeftWhite) ? globalThis.Number(object.timeLeftWhite) : undefined,
      timeLeftBlack: isSet(object.timeLeftBlack) ? globalThis.Number(object.timeLeftBlack) : undefined,
      drawAskedBy: isSet(object.drawAskedBy) ? globalThis.String(object.drawAskedBy) : undefined,
    };
  },

  toJSON(message: GameStateMsg): unknown {
    const obj: any = {};
    if (message.fen !== "") {
      obj.fen = message.fen;
    }
    if (message.moveSans?.length) {
      obj.moveSans = message.moveSans;
    }
    if (message.outcome !== 0) {
      obj.outcome = gameOutcomeToJSON(message.outcome);
    }
    if (message.timeLeftWhite !== undefined) {
      obj.timeLeftWhite = Math.round(message.timeLeftWhite);
    }
    if (message.timeLeftBlack !== undefined) {
      obj.timeLeftBlack = Math.round(message.timeLeftBlack);
    }
    if (message.drawAskedBy !== undefined) {
      obj.drawAskedBy = message.drawAskedBy;
    }
    return obj;
  },

  create(base?: DeepPartial<GameStateMsg>): GameStateMsg {
    return GameStateMsg.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GameStateMsg>): GameStateMsg {
    const message = createBaseGameStateMsg();
    message.fen = object.fen ?? "";
    message.moveSans = object.moveSans?.map((e) => e) || [];
    message.outcome = object.outcome ?? 0;
    message.timeLeftWhite = object.timeLeftWhite ?? undefined;
    message.timeLeftBlack = object.timeLeftBlack ?? undefined;
    message.drawAskedBy = object.drawAskedBy ?? undefined;
    return message;
  },
};

function createBaseCreateGameRequest(): CreateGameRequest {
  return { whitePlayerId: "", blackPlayerId: "", settings: undefined };
}

export const CreateGameRequest = {
  encode(message: CreateGameRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.whitePlayerId !== "") {
      writer.uint32(10).string(message.whitePlayerId);
    }
    if (message.blackPlayerId !== "") {
      writer.uint32(18).string(message.blackPlayerId);
    }
    if (message.settings !== undefined) {
      GameSettingsMsg.encode(message.settings, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGameRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGameRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.whitePlayerId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blackPlayerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.settings = GameSettingsMsg.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateGameRequest {
    return {
      whitePlayerId: isSet(object.whitePlayerId) ? globalThis.String(object.whitePlayerId) : "",
      blackPlayerId: isSet(object.blackPlayerId) ? globalThis.String(object.blackPlayerId) : "",
      settings: isSet(object.settings) ? GameSettingsMsg.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: CreateGameRequest): unknown {
    const obj: any = {};
    if (message.whitePlayerId !== "") {
      obj.whitePlayerId = message.whitePlayerId;
    }
    if (message.blackPlayerId !== "") {
      obj.blackPlayerId = message.blackPlayerId;
    }
    if (message.settings !== undefined) {
      obj.settings = GameSettingsMsg.toJSON(message.settings);
    }
    return obj;
  },

  create(base?: DeepPartial<CreateGameRequest>): CreateGameRequest {
    return CreateGameRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateGameRequest>): CreateGameRequest {
    const message = createBaseCreateGameRequest();
    message.whitePlayerId = object.whitePlayerId ?? "";
    message.blackPlayerId = object.blackPlayerId ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? GameSettingsMsg.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGameIdMsg(): GameIdMsg {
  return { gameId: "" };
}

export const GameIdMsg = {
  encode(message: GameIdMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameIdMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameIdMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gameId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameIdMsg {
    return { gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "" };
  },

  toJSON(message: GameIdMsg): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    return obj;
  },

  create(base?: DeepPartial<GameIdMsg>): GameIdMsg {
    return GameIdMsg.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GameIdMsg>): GameIdMsg {
    const message = createBaseGameIdMsg();
    message.gameId = object.gameId ?? "";
    return message;
  },
};

function createBaseGetGameInfoResponse(): GetGameInfoResponse {
  return {
    whitePlayerId: "",
    blackPlayerId: "",
    settings: undefined,
    state: undefined,
    whitePlayerUsername: undefined,
    blackPlayerUsername: undefined,
  };
}

export const GetGameInfoResponse = {
  encode(message: GetGameInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.whitePlayerId !== "") {
      writer.uint32(10).string(message.whitePlayerId);
    }
    if (message.blackPlayerId !== "") {
      writer.uint32(18).string(message.blackPlayerId);
    }
    if (message.settings !== undefined) {
      GameSettingsMsg.encode(message.settings, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== undefined) {
      GameStateMsg.encode(message.state, writer.uint32(34).fork()).ldelim();
    }
    if (message.whitePlayerUsername !== undefined) {
      writer.uint32(42).string(message.whitePlayerUsername);
    }
    if (message.blackPlayerUsername !== undefined) {
      writer.uint32(50).string(message.blackPlayerUsername);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGameInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGameInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.whitePlayerId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.blackPlayerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.settings = GameSettingsMsg.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.state = GameStateMsg.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.whitePlayerUsername = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.blackPlayerUsername = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGameInfoResponse {
    return {
      whitePlayerId: isSet(object.whitePlayerId) ? globalThis.String(object.whitePlayerId) : "",
      blackPlayerId: isSet(object.blackPlayerId) ? globalThis.String(object.blackPlayerId) : "",
      settings: isSet(object.settings) ? GameSettingsMsg.fromJSON(object.settings) : undefined,
      state: isSet(object.state) ? GameStateMsg.fromJSON(object.state) : undefined,
      whitePlayerUsername: isSet(object.whitePlayerUsername)
        ? globalThis.String(object.whitePlayerUsername)
        : undefined,
      blackPlayerUsername: isSet(object.blackPlayerUsername)
        ? globalThis.String(object.blackPlayerUsername)
        : undefined,
    };
  },

  toJSON(message: GetGameInfoResponse): unknown {
    const obj: any = {};
    if (message.whitePlayerId !== "") {
      obj.whitePlayerId = message.whitePlayerId;
    }
    if (message.blackPlayerId !== "") {
      obj.blackPlayerId = message.blackPlayerId;
    }
    if (message.settings !== undefined) {
      obj.settings = GameSettingsMsg.toJSON(message.settings);
    }
    if (message.state !== undefined) {
      obj.state = GameStateMsg.toJSON(message.state);
    }
    if (message.whitePlayerUsername !== undefined) {
      obj.whitePlayerUsername = message.whitePlayerUsername;
    }
    if (message.blackPlayerUsername !== undefined) {
      obj.blackPlayerUsername = message.blackPlayerUsername;
    }
    return obj;
  },

  create(base?: DeepPartial<GetGameInfoResponse>): GetGameInfoResponse {
    return GetGameInfoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetGameInfoResponse>): GetGameInfoResponse {
    const message = createBaseGetGameInfoResponse();
    message.whitePlayerId = object.whitePlayerId ?? "";
    message.blackPlayerId = object.blackPlayerId ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? GameSettingsMsg.fromPartial(object.settings)
      : undefined;
    message.state = (object.state !== undefined && object.state !== null)
      ? GameStateMsg.fromPartial(object.state)
      : undefined;
    message.whitePlayerUsername = object.whitePlayerUsername ?? undefined;
    message.blackPlayerUsername = object.blackPlayerUsername ?? undefined;
    return message;
  },
};

function createBaseMakeMoveRequest(): MakeMoveRequest {
  return { gameId: "", playerId: "", san: "" };
}

export const MakeMoveRequest = {
  encode(message: MakeMoveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.playerId !== "") {
      writer.uint32(18).string(message.playerId);
    }
    if (message.san !== "") {
      writer.uint32(26).string(message.san);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MakeMoveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeMoveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gameId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.playerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.san = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MakeMoveRequest {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      playerId: isSet(object.playerId) ? globalThis.String(object.playerId) : "",
      san: isSet(object.san) ? globalThis.String(object.san) : "",
    };
  },

  toJSON(message: MakeMoveRequest): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.playerId !== "") {
      obj.playerId = message.playerId;
    }
    if (message.san !== "") {
      obj.san = message.san;
    }
    return obj;
  },

  create(base?: DeepPartial<MakeMoveRequest>): MakeMoveRequest {
    return MakeMoveRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MakeMoveRequest>): MakeMoveRequest {
    const message = createBaseMakeMoveRequest();
    message.gameId = object.gameId ?? "";
    message.playerId = object.playerId ?? "";
    message.san = object.san ?? "";
    return message;
  },
};

function createBaseMakeMoveResponse(): MakeMoveResponse {
  return { gameId: "", san: "", updatedFen: "", updatedOutcome: 0, updatedTimeLeft: undefined };
}

export const MakeMoveResponse = {
  encode(message: MakeMoveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.san !== "") {
      writer.uint32(18).string(message.san);
    }
    if (message.updatedFen !== "") {
      writer.uint32(26).string(message.updatedFen);
    }
    if (message.updatedOutcome !== 0) {
      writer.uint32(32).int32(message.updatedOutcome);
    }
    if (message.updatedTimeLeft !== undefined) {
      writer.uint32(40).uint32(message.updatedTimeLeft);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MakeMoveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeMoveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gameId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.san = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.updatedFen = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.updatedOutcome = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.updatedTimeLeft = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MakeMoveResponse {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      san: isSet(object.san) ? globalThis.String(object.san) : "",
      updatedFen: isSet(object.updatedFen) ? globalThis.String(object.updatedFen) : "",
      updatedOutcome: isSet(object.updatedOutcome) ? gameOutcomeFromJSON(object.updatedOutcome) : 0,
      updatedTimeLeft: isSet(object.updatedTimeLeft) ? globalThis.Number(object.updatedTimeLeft) : undefined,
    };
  },

  toJSON(message: MakeMoveResponse): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.san !== "") {
      obj.san = message.san;
    }
    if (message.updatedFen !== "") {
      obj.updatedFen = message.updatedFen;
    }
    if (message.updatedOutcome !== 0) {
      obj.updatedOutcome = gameOutcomeToJSON(message.updatedOutcome);
    }
    if (message.updatedTimeLeft !== undefined) {
      obj.updatedTimeLeft = Math.round(message.updatedTimeLeft);
    }
    return obj;
  },

  create(base?: DeepPartial<MakeMoveResponse>): MakeMoveResponse {
    return MakeMoveResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MakeMoveResponse>): MakeMoveResponse {
    const message = createBaseMakeMoveResponse();
    message.gameId = object.gameId ?? "";
    message.san = object.san ?? "";
    message.updatedFen = object.updatedFen ?? "";
    message.updatedOutcome = object.updatedOutcome ?? 0;
    message.updatedTimeLeft = object.updatedTimeLeft ?? undefined;
    return message;
  },
};

function createBaseAskOrAcceptDrawRequest(): AskOrAcceptDrawRequest {
  return { gameId: "", playerId: "" };
}

export const AskOrAcceptDrawRequest = {
  encode(message: AskOrAcceptDrawRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.playerId !== "") {
      writer.uint32(18).string(message.playerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AskOrAcceptDrawRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAskOrAcceptDrawRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.gameId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.playerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AskOrAcceptDrawRequest {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      playerId: isSet(object.playerId) ? globalThis.String(object.playerId) : "",
    };
  },

  toJSON(message: AskOrAcceptDrawRequest): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.playerId !== "") {
      obj.playerId = message.playerId;
    }
    return obj;
  },

  create(base?: DeepPartial<AskOrAcceptDrawRequest>): AskOrAcceptDrawRequest {
    return AskOrAcceptDrawRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AskOrAcceptDrawRequest>): AskOrAcceptDrawRequest {
    const message = createBaseAskOrAcceptDrawRequest();
    message.gameId = object.gameId ?? "";
    message.playerId = object.playerId ?? "";
    return message;
  },
};

export type GameServiceDefinition = typeof GameServiceDefinition;
export const GameServiceDefinition = {
  name: "GameService",
  fullName: "GameService",
  methods: {
    createGame: {
      name: "CreateGame",
      requestType: CreateGameRequest,
      requestStream: false,
      responseType: GameIdMsg,
      responseStream: false,
      options: {},
    },
    makeMove: {
      name: "MakeMove",
      requestType: MakeMoveRequest,
      requestStream: false,
      responseType: MakeMoveResponse,
      responseStream: false,
      options: {},
    },
    getGameInfo: {
      name: "GetGameInfo",
      requestType: GameIdMsg,
      requestStream: false,
      responseType: GetGameInfoResponse,
      responseStream: false,
      options: {},
    },
    /** rpc GetGames(GetGamesMessage) returns (GameRecordsMessage) {} */
    askDraw: {
      name: "AskDraw",
      requestType: AskOrAcceptDrawRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    acceptDraw: {
      name: "AcceptDraw",
      requestType: AskOrAcceptDrawRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface GameServiceImplementation<CallContextExt = {}> {
  createGame(request: CreateGameRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GameIdMsg>>;
  makeMove(request: MakeMoveRequest, context: CallContext & CallContextExt): Promise<DeepPartial<MakeMoveResponse>>;
  getGameInfo(request: GameIdMsg, context: CallContext & CallContextExt): Promise<DeepPartial<GetGameInfoResponse>>;
  /** rpc GetGames(GetGamesMessage) returns (GameRecordsMessage) {} */
  askDraw(request: AskOrAcceptDrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  acceptDraw(request: AskOrAcceptDrawRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
}

export interface GameServiceClient<CallOptionsExt = {}> {
  createGame(request: DeepPartial<CreateGameRequest>, options?: CallOptions & CallOptionsExt): Promise<GameIdMsg>;
  makeMove(request: DeepPartial<MakeMoveRequest>, options?: CallOptions & CallOptionsExt): Promise<MakeMoveResponse>;
  getGameInfo(request: DeepPartial<GameIdMsg>, options?: CallOptions & CallOptionsExt): Promise<GetGameInfoResponse>;
  /** rpc GetGames(GetGamesMessage) returns (GameRecordsMessage) {} */
  askDraw(request: DeepPartial<AskOrAcceptDrawRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  acceptDraw(request: DeepPartial<AskOrAcceptDrawRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
