/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

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

export enum PlayAs {
  WHITE = 0,
  BLACK = 1,
  RANDOM = 2,
  UNRECOGNIZED = -1,
}

export function playAsFromJSON(object: any): PlayAs {
  switch (object) {
    case 0:
    case "WHITE":
      return PlayAs.WHITE;
    case 1:
    case "BLACK":
      return PlayAs.BLACK;
    case 2:
    case "RANDOM":
      return PlayAs.RANDOM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PlayAs.UNRECOGNIZED;
  }
}

export function playAsToJSON(object: PlayAs): string {
  switch (object) {
    case PlayAs.WHITE:
      return "WHITE";
    case PlayAs.BLACK:
      return "BLACK";
    case PlayAs.RANDOM:
      return "RANDOM";
    case PlayAs.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GameSettingsMessage {
  maxTimeForPlayerSec?: number | undefined;
  timeGainedOnMoveSec?: number | undefined;
  playAs?: PlayAs | undefined;
}

export interface CreateGameMessage {
  whitePlayerId: string;
  blackPlayerId: string;
  settings: GameSettingsMessage | undefined;
}

export interface GameCreatedMessage {
  gameId: string;
}

export interface MakeMoveMessage {
  gameId: string;
  playerId: string;
  move: string;
}

export interface MoveValidatedMessage {
  gameId: string;
  resultingFen: string;
  outcome: GameOutcome;
  timeRemainingWhiteSec: number;
  timeRemainingBlackSec: number;
}

export interface GetGameStateMessage {
  gameId: string;
}

export interface GameStateMessage {
  fen: string;
  timeRemainingWhiteSec: number;
  timeRemainingBlackSec: number;
  moves: string[];
}

export interface GetGamesMessage {
  playerId: string;
  fromTime?: Date | undefined;
  toTime?: Date | undefined;
}

export interface GameRecordsMessage {
  games: GameRecordsMessage_GameRecordMessage[];
}

export interface GameRecordsMessage_GameRecordMessage {
  gameId: string;
  whitePlayerId: string;
  blackPlayerId: string;
  moves: string[];
  createdAt: Date | undefined;
}

function createBaseGameSettingsMessage(): GameSettingsMessage {
  return { maxTimeForPlayerSec: undefined, timeGainedOnMoveSec: undefined, playAs: undefined };
}

export const GameSettingsMessage = {
  encode(message: GameSettingsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxTimeForPlayerSec !== undefined) {
      writer.uint32(8).uint32(message.maxTimeForPlayerSec);
    }
    if (message.timeGainedOnMoveSec !== undefined) {
      writer.uint32(16).uint32(message.timeGainedOnMoveSec);
    }
    if (message.playAs !== undefined) {
      writer.uint32(24).int32(message.playAs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameSettingsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameSettingsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxTimeForPlayerSec = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timeGainedOnMoveSec = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.playAs = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameSettingsMessage {
    return {
      maxTimeForPlayerSec: isSet(object.maxTimeForPlayerSec)
        ? globalThis.Number(object.maxTimeForPlayerSec)
        : undefined,
      timeGainedOnMoveSec: isSet(object.timeGainedOnMoveSec)
        ? globalThis.Number(object.timeGainedOnMoveSec)
        : undefined,
      playAs: isSet(object.playAs) ? playAsFromJSON(object.playAs) : undefined,
    };
  },

  toJSON(message: GameSettingsMessage): unknown {
    const obj: any = {};
    if (message.maxTimeForPlayerSec !== undefined) {
      obj.maxTimeForPlayerSec = Math.round(message.maxTimeForPlayerSec);
    }
    if (message.timeGainedOnMoveSec !== undefined) {
      obj.timeGainedOnMoveSec = Math.round(message.timeGainedOnMoveSec);
    }
    if (message.playAs !== undefined) {
      obj.playAs = playAsToJSON(message.playAs);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameSettingsMessage>, I>>(base?: I): GameSettingsMessage {
    return GameSettingsMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameSettingsMessage>, I>>(object: I): GameSettingsMessage {
    const message = createBaseGameSettingsMessage();
    message.maxTimeForPlayerSec = object.maxTimeForPlayerSec ?? undefined;
    message.timeGainedOnMoveSec = object.timeGainedOnMoveSec ?? undefined;
    message.playAs = object.playAs ?? undefined;
    return message;
  },
};

function createBaseCreateGameMessage(): CreateGameMessage {
  return { whitePlayerId: "", blackPlayerId: "", settings: undefined };
}

export const CreateGameMessage = {
  encode(message: CreateGameMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.whitePlayerId !== "") {
      writer.uint32(10).string(message.whitePlayerId);
    }
    if (message.blackPlayerId !== "") {
      writer.uint32(18).string(message.blackPlayerId);
    }
    if (message.settings !== undefined) {
      GameSettingsMessage.encode(message.settings, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateGameMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateGameMessage();
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

          message.settings = GameSettingsMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateGameMessage {
    return {
      whitePlayerId: isSet(object.whitePlayerId) ? globalThis.String(object.whitePlayerId) : "",
      blackPlayerId: isSet(object.blackPlayerId) ? globalThis.String(object.blackPlayerId) : "",
      settings: isSet(object.settings) ? GameSettingsMessage.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: CreateGameMessage): unknown {
    const obj: any = {};
    if (message.whitePlayerId !== "") {
      obj.whitePlayerId = message.whitePlayerId;
    }
    if (message.blackPlayerId !== "") {
      obj.blackPlayerId = message.blackPlayerId;
    }
    if (message.settings !== undefined) {
      obj.settings = GameSettingsMessage.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateGameMessage>, I>>(base?: I): CreateGameMessage {
    return CreateGameMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateGameMessage>, I>>(object: I): CreateGameMessage {
    const message = createBaseCreateGameMessage();
    message.whitePlayerId = object.whitePlayerId ?? "";
    message.blackPlayerId = object.blackPlayerId ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? GameSettingsMessage.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseGameCreatedMessage(): GameCreatedMessage {
  return { gameId: "" };
}

export const GameCreatedMessage = {
  encode(message: GameCreatedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameCreatedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameCreatedMessage();
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

  fromJSON(object: any): GameCreatedMessage {
    return { gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "" };
  },

  toJSON(message: GameCreatedMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameCreatedMessage>, I>>(base?: I): GameCreatedMessage {
    return GameCreatedMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameCreatedMessage>, I>>(object: I): GameCreatedMessage {
    const message = createBaseGameCreatedMessage();
    message.gameId = object.gameId ?? "";
    return message;
  },
};

function createBaseMakeMoveMessage(): MakeMoveMessage {
  return { gameId: "", playerId: "", move: "" };
}

export const MakeMoveMessage = {
  encode(message: MakeMoveMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.playerId !== "") {
      writer.uint32(18).string(message.playerId);
    }
    if (message.move !== "") {
      writer.uint32(26).string(message.move);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MakeMoveMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMakeMoveMessage();
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

          message.move = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MakeMoveMessage {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      playerId: isSet(object.playerId) ? globalThis.String(object.playerId) : "",
      move: isSet(object.move) ? globalThis.String(object.move) : "",
    };
  },

  toJSON(message: MakeMoveMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.playerId !== "") {
      obj.playerId = message.playerId;
    }
    if (message.move !== "") {
      obj.move = message.move;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MakeMoveMessage>, I>>(base?: I): MakeMoveMessage {
    return MakeMoveMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MakeMoveMessage>, I>>(object: I): MakeMoveMessage {
    const message = createBaseMakeMoveMessage();
    message.gameId = object.gameId ?? "";
    message.playerId = object.playerId ?? "";
    message.move = object.move ?? "";
    return message;
  },
};

function createBaseMoveValidatedMessage(): MoveValidatedMessage {
  return { gameId: "", resultingFen: "", outcome: 0, timeRemainingWhiteSec: 0, timeRemainingBlackSec: 0 };
}

export const MoveValidatedMessage = {
  encode(message: MoveValidatedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.resultingFen !== "") {
      writer.uint32(18).string(message.resultingFen);
    }
    if (message.outcome !== 0) {
      writer.uint32(24).int32(message.outcome);
    }
    if (message.timeRemainingWhiteSec !== 0) {
      writer.uint32(32).uint32(message.timeRemainingWhiteSec);
    }
    if (message.timeRemainingBlackSec !== 0) {
      writer.uint32(40).uint32(message.timeRemainingBlackSec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MoveValidatedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoveValidatedMessage();
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

          message.resultingFen = reader.string();
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

          message.timeRemainingWhiteSec = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.timeRemainingBlackSec = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MoveValidatedMessage {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      resultingFen: isSet(object.resultingFen) ? globalThis.String(object.resultingFen) : "",
      outcome: isSet(object.outcome) ? gameOutcomeFromJSON(object.outcome) : 0,
      timeRemainingWhiteSec: isSet(object.timeRemainingWhiteSec) ? globalThis.Number(object.timeRemainingWhiteSec) : 0,
      timeRemainingBlackSec: isSet(object.timeRemainingBlackSec) ? globalThis.Number(object.timeRemainingBlackSec) : 0,
    };
  },

  toJSON(message: MoveValidatedMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.resultingFen !== "") {
      obj.resultingFen = message.resultingFen;
    }
    if (message.outcome !== 0) {
      obj.outcome = gameOutcomeToJSON(message.outcome);
    }
    if (message.timeRemainingWhiteSec !== 0) {
      obj.timeRemainingWhiteSec = Math.round(message.timeRemainingWhiteSec);
    }
    if (message.timeRemainingBlackSec !== 0) {
      obj.timeRemainingBlackSec = Math.round(message.timeRemainingBlackSec);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MoveValidatedMessage>, I>>(base?: I): MoveValidatedMessage {
    return MoveValidatedMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MoveValidatedMessage>, I>>(object: I): MoveValidatedMessage {
    const message = createBaseMoveValidatedMessage();
    message.gameId = object.gameId ?? "";
    message.resultingFen = object.resultingFen ?? "";
    message.outcome = object.outcome ?? 0;
    message.timeRemainingWhiteSec = object.timeRemainingWhiteSec ?? 0;
    message.timeRemainingBlackSec = object.timeRemainingBlackSec ?? 0;
    return message;
  },
};

function createBaseGetGameStateMessage(): GetGameStateMessage {
  return { gameId: "" };
}

export const GetGameStateMessage = {
  encode(message: GetGameStateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGameStateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGameStateMessage();
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

  fromJSON(object: any): GetGameStateMessage {
    return { gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "" };
  },

  toJSON(message: GetGameStateMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGameStateMessage>, I>>(base?: I): GetGameStateMessage {
    return GetGameStateMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGameStateMessage>, I>>(object: I): GetGameStateMessage {
    const message = createBaseGetGameStateMessage();
    message.gameId = object.gameId ?? "";
    return message;
  },
};

function createBaseGameStateMessage(): GameStateMessage {
  return { fen: "", timeRemainingWhiteSec: 0, timeRemainingBlackSec: 0, moves: [] };
}

export const GameStateMessage = {
  encode(message: GameStateMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fen !== "") {
      writer.uint32(10).string(message.fen);
    }
    if (message.timeRemainingWhiteSec !== 0) {
      writer.uint32(16).uint32(message.timeRemainingWhiteSec);
    }
    if (message.timeRemainingBlackSec !== 0) {
      writer.uint32(24).uint32(message.timeRemainingBlackSec);
    }
    for (const v of message.moves) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameStateMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameStateMessage();
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
          if (tag !== 16) {
            break;
          }

          message.timeRemainingWhiteSec = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.timeRemainingBlackSec = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.moves.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameStateMessage {
    return {
      fen: isSet(object.fen) ? globalThis.String(object.fen) : "",
      timeRemainingWhiteSec: isSet(object.timeRemainingWhiteSec) ? globalThis.Number(object.timeRemainingWhiteSec) : 0,
      timeRemainingBlackSec: isSet(object.timeRemainingBlackSec) ? globalThis.Number(object.timeRemainingBlackSec) : 0,
      moves: globalThis.Array.isArray(object?.moves) ? object.moves.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: GameStateMessage): unknown {
    const obj: any = {};
    if (message.fen !== "") {
      obj.fen = message.fen;
    }
    if (message.timeRemainingWhiteSec !== 0) {
      obj.timeRemainingWhiteSec = Math.round(message.timeRemainingWhiteSec);
    }
    if (message.timeRemainingBlackSec !== 0) {
      obj.timeRemainingBlackSec = Math.round(message.timeRemainingBlackSec);
    }
    if (message.moves?.length) {
      obj.moves = message.moves;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameStateMessage>, I>>(base?: I): GameStateMessage {
    return GameStateMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameStateMessage>, I>>(object: I): GameStateMessage {
    const message = createBaseGameStateMessage();
    message.fen = object.fen ?? "";
    message.timeRemainingWhiteSec = object.timeRemainingWhiteSec ?? 0;
    message.timeRemainingBlackSec = object.timeRemainingBlackSec ?? 0;
    message.moves = object.moves?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetGamesMessage(): GetGamesMessage {
  return { playerId: "", fromTime: undefined, toTime: undefined };
}

export const GetGamesMessage = {
  encode(message: GetGamesMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playerId !== "") {
      writer.uint32(10).string(message.playerId);
    }
    if (message.fromTime !== undefined) {
      Timestamp.encode(toTimestamp(message.fromTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.toTime !== undefined) {
      Timestamp.encode(toTimestamp(message.toTime), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetGamesMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetGamesMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.playerId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.fromTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.toTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetGamesMessage {
    return {
      playerId: isSet(object.playerId) ? globalThis.String(object.playerId) : "",
      fromTime: isSet(object.fromTime) ? fromJsonTimestamp(object.fromTime) : undefined,
      toTime: isSet(object.toTime) ? fromJsonTimestamp(object.toTime) : undefined,
    };
  },

  toJSON(message: GetGamesMessage): unknown {
    const obj: any = {};
    if (message.playerId !== "") {
      obj.playerId = message.playerId;
    }
    if (message.fromTime !== undefined) {
      obj.fromTime = message.fromTime.toISOString();
    }
    if (message.toTime !== undefined) {
      obj.toTime = message.toTime.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetGamesMessage>, I>>(base?: I): GetGamesMessage {
    return GetGamesMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetGamesMessage>, I>>(object: I): GetGamesMessage {
    const message = createBaseGetGamesMessage();
    message.playerId = object.playerId ?? "";
    message.fromTime = object.fromTime ?? undefined;
    message.toTime = object.toTime ?? undefined;
    return message;
  },
};

function createBaseGameRecordsMessage(): GameRecordsMessage {
  return { games: [] };
}

export const GameRecordsMessage = {
  encode(message: GameRecordsMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.games) {
      GameRecordsMessage_GameRecordMessage.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameRecordsMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameRecordsMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.games.push(GameRecordsMessage_GameRecordMessage.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameRecordsMessage {
    return {
      games: globalThis.Array.isArray(object?.games)
        ? object.games.map((e: any) => GameRecordsMessage_GameRecordMessage.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GameRecordsMessage): unknown {
    const obj: any = {};
    if (message.games?.length) {
      obj.games = message.games.map((e) => GameRecordsMessage_GameRecordMessage.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameRecordsMessage>, I>>(base?: I): GameRecordsMessage {
    return GameRecordsMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameRecordsMessage>, I>>(object: I): GameRecordsMessage {
    const message = createBaseGameRecordsMessage();
    message.games = object.games?.map((e) => GameRecordsMessage_GameRecordMessage.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGameRecordsMessage_GameRecordMessage(): GameRecordsMessage_GameRecordMessage {
  return { gameId: "", whitePlayerId: "", blackPlayerId: "", moves: [], createdAt: undefined };
}

export const GameRecordsMessage_GameRecordMessage = {
  encode(message: GameRecordsMessage_GameRecordMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.whitePlayerId !== "") {
      writer.uint32(18).string(message.whitePlayerId);
    }
    if (message.blackPlayerId !== "") {
      writer.uint32(26).string(message.blackPlayerId);
    }
    for (const v of message.moves) {
      writer.uint32(34).string(v!);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameRecordsMessage_GameRecordMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameRecordsMessage_GameRecordMessage();
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

          message.whitePlayerId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blackPlayerId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.moves.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameRecordsMessage_GameRecordMessage {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      whitePlayerId: isSet(object.whitePlayerId) ? globalThis.String(object.whitePlayerId) : "",
      blackPlayerId: isSet(object.blackPlayerId) ? globalThis.String(object.blackPlayerId) : "",
      moves: globalThis.Array.isArray(object?.moves) ? object.moves.map((e: any) => globalThis.String(e)) : [],
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: GameRecordsMessage_GameRecordMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.whitePlayerId !== "") {
      obj.whitePlayerId = message.whitePlayerId;
    }
    if (message.blackPlayerId !== "") {
      obj.blackPlayerId = message.blackPlayerId;
    }
    if (message.moves?.length) {
      obj.moves = message.moves;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameRecordsMessage_GameRecordMessage>, I>>(
    base?: I,
  ): GameRecordsMessage_GameRecordMessage {
    return GameRecordsMessage_GameRecordMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameRecordsMessage_GameRecordMessage>, I>>(
    object: I,
  ): GameRecordsMessage_GameRecordMessage {
    const message = createBaseGameRecordsMessage_GameRecordMessage();
    message.gameId = object.gameId ?? "";
    message.whitePlayerId = object.whitePlayerId ?? "";
    message.blackPlayerId = object.blackPlayerId ?? "";
    message.moves = object.moves?.map((e) => e) || [];
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

export type GameServiceService = typeof GameServiceService;
export const GameServiceService = {
  createGame: {
    path: "/GameService/CreateGame",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateGameMessage) => Buffer.from(CreateGameMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateGameMessage.decode(value),
    responseSerialize: (value: GameCreatedMessage) => Buffer.from(GameCreatedMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GameCreatedMessage.decode(value),
  },
  makeMove: {
    path: "/GameService/MakeMove",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: MakeMoveMessage) => Buffer.from(MakeMoveMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => MakeMoveMessage.decode(value),
    responseSerialize: (value: MoveValidatedMessage) => Buffer.from(MoveValidatedMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => MoveValidatedMessage.decode(value),
  },
  getGameState: {
    path: "/GameService/GetGameState",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetGameStateMessage) => Buffer.from(GetGameStateMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetGameStateMessage.decode(value),
    responseSerialize: (value: GameStateMessage) => Buffer.from(GameStateMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GameStateMessage.decode(value),
  },
  getGames: {
    path: "/GameService/GetGames",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetGamesMessage) => Buffer.from(GetGamesMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetGamesMessage.decode(value),
    responseSerialize: (value: GameRecordsMessage) => Buffer.from(GameRecordsMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GameRecordsMessage.decode(value),
  },
} as const;

export interface GameServiceServer extends UntypedServiceImplementation {
  createGame: handleUnaryCall<CreateGameMessage, GameCreatedMessage>;
  makeMove: handleUnaryCall<MakeMoveMessage, MoveValidatedMessage>;
  getGameState: handleUnaryCall<GetGameStateMessage, GameStateMessage>;
  getGames: handleUnaryCall<GetGamesMessage, GameRecordsMessage>;
}

export interface GameServiceClient extends Client {
  createGame(
    request: CreateGameMessage,
    callback: (error: ServiceError | null, response: GameCreatedMessage) => void,
  ): ClientUnaryCall;
  createGame(
    request: CreateGameMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GameCreatedMessage) => void,
  ): ClientUnaryCall;
  createGame(
    request: CreateGameMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GameCreatedMessage) => void,
  ): ClientUnaryCall;
  makeMove(
    request: MakeMoveMessage,
    callback: (error: ServiceError | null, response: MoveValidatedMessage) => void,
  ): ClientUnaryCall;
  makeMove(
    request: MakeMoveMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: MoveValidatedMessage) => void,
  ): ClientUnaryCall;
  makeMove(
    request: MakeMoveMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: MoveValidatedMessage) => void,
  ): ClientUnaryCall;
  getGameState(
    request: GetGameStateMessage,
    callback: (error: ServiceError | null, response: GameStateMessage) => void,
  ): ClientUnaryCall;
  getGameState(
    request: GetGameStateMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GameStateMessage) => void,
  ): ClientUnaryCall;
  getGameState(
    request: GetGameStateMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GameStateMessage) => void,
  ): ClientUnaryCall;
  getGames(
    request: GetGamesMessage,
    callback: (error: ServiceError | null, response: GameRecordsMessage) => void,
  ): ClientUnaryCall;
  getGames(
    request: GetGamesMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GameRecordsMessage) => void,
  ): ClientUnaryCall;
  getGames(
    request: GetGamesMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GameRecordsMessage) => void,
  ): ClientUnaryCall;
}

export const GameServiceClient = makeGenericClientConstructor(GameServiceService, "GameService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): GameServiceClient;
  service: typeof GameServiceService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
