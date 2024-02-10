/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { GameSettingsMsg } from "./game_svc";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "";

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

export interface CreateInviteLinkRequest {
  userId: string;
  gameSettings: GameSettingsMsg | undefined;
  playAs: PlayAs;
}

export interface ConsumeInviteLinkRequest {
  inviterId: string;
  userId: string;
}

export interface ConsumeInviteLinkResponse {
  gameId: string;
  inviterId: string;
}

export interface UserIdMessage {
  userId: string;
}

function createBaseCreateInviteLinkRequest(): CreateInviteLinkRequest {
  return { userId: "", gameSettings: undefined, playAs: 0 };
}

export const CreateInviteLinkRequest = {
  encode(message: CreateInviteLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.gameSettings !== undefined) {
      GameSettingsMsg.encode(message.gameSettings, writer.uint32(18).fork()).ldelim();
    }
    if (message.playAs !== 0) {
      writer.uint32(24).int32(message.playAs);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInviteLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gameSettings = GameSettingsMsg.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateInviteLinkRequest {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      gameSettings: isSet(object.gameSettings) ? GameSettingsMsg.fromJSON(object.gameSettings) : undefined,
      playAs: isSet(object.playAs) ? playAsFromJSON(object.playAs) : 0,
    };
  },

  toJSON(message: CreateInviteLinkRequest): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.gameSettings !== undefined) {
      obj.gameSettings = GameSettingsMsg.toJSON(message.gameSettings);
    }
    if (message.playAs !== 0) {
      obj.playAs = playAsToJSON(message.playAs);
    }
    return obj;
  },

  create(base?: DeepPartial<CreateInviteLinkRequest>): CreateInviteLinkRequest {
    return CreateInviteLinkRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateInviteLinkRequest>): CreateInviteLinkRequest {
    const message = createBaseCreateInviteLinkRequest();
    message.userId = object.userId ?? "";
    message.gameSettings = (object.gameSettings !== undefined && object.gameSettings !== null)
      ? GameSettingsMsg.fromPartial(object.gameSettings)
      : undefined;
    message.playAs = object.playAs ?? 0;
    return message;
  },
};

function createBaseConsumeInviteLinkRequest(): ConsumeInviteLinkRequest {
  return { inviterId: "", userId: "" };
}

export const ConsumeInviteLinkRequest = {
  encode(message: ConsumeInviteLinkRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inviterId !== "") {
      writer.uint32(10).string(message.inviterId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumeInviteLinkRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumeInviteLinkRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inviterId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsumeInviteLinkRequest {
    return {
      inviterId: isSet(object.inviterId) ? globalThis.String(object.inviterId) : "",
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
    };
  },

  toJSON(message: ConsumeInviteLinkRequest): unknown {
    const obj: any = {};
    if (message.inviterId !== "") {
      obj.inviterId = message.inviterId;
    }
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<ConsumeInviteLinkRequest>): ConsumeInviteLinkRequest {
    return ConsumeInviteLinkRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConsumeInviteLinkRequest>): ConsumeInviteLinkRequest {
    const message = createBaseConsumeInviteLinkRequest();
    message.inviterId = object.inviterId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseConsumeInviteLinkResponse(): ConsumeInviteLinkResponse {
  return { gameId: "", inviterId: "" };
}

export const ConsumeInviteLinkResponse = {
  encode(message: ConsumeInviteLinkResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    if (message.inviterId !== "") {
      writer.uint32(18).string(message.inviterId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumeInviteLinkResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumeInviteLinkResponse();
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

          message.inviterId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConsumeInviteLinkResponse {
    return {
      gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "",
      inviterId: isSet(object.inviterId) ? globalThis.String(object.inviterId) : "",
    };
  },

  toJSON(message: ConsumeInviteLinkResponse): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    if (message.inviterId !== "") {
      obj.inviterId = message.inviterId;
    }
    return obj;
  },

  create(base?: DeepPartial<ConsumeInviteLinkResponse>): ConsumeInviteLinkResponse {
    return ConsumeInviteLinkResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConsumeInviteLinkResponse>): ConsumeInviteLinkResponse {
    const message = createBaseConsumeInviteLinkResponse();
    message.gameId = object.gameId ?? "";
    message.inviterId = object.inviterId ?? "";
    return message;
  },
};

function createBaseUserIdMessage(): UserIdMessage {
  return { userId: "" };
}

export const UserIdMessage = {
  encode(message: UserIdMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserIdMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserIdMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserIdMessage {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: UserIdMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<UserIdMessage>): UserIdMessage {
    return UserIdMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserIdMessage>): UserIdMessage {
    const message = createBaseUserIdMessage();
    message.userId = object.userId ?? "";
    return message;
  },
};

export type InviteServiceDefinition = typeof InviteServiceDefinition;
export const InviteServiceDefinition = {
  name: "InviteService",
  fullName: "InviteService",
  methods: {
    createInviteLink: {
      name: "CreateInviteLink",
      requestType: CreateInviteLinkRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    consumeInviteLink: {
      name: "ConsumeInviteLink",
      requestType: ConsumeInviteLinkRequest,
      requestStream: false,
      responseType: ConsumeInviteLinkResponse,
      responseStream: false,
      options: {},
    },
    invalidateInviteLink: {
      name: "invalidateInviteLink",
      requestType: UserIdMessage,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface InviteServiceImplementation<CallContextExt = {}> {
  createInviteLink(
    request: CreateInviteLinkRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Empty>>;
  consumeInviteLink(
    request: ConsumeInviteLinkRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConsumeInviteLinkResponse>>;
  invalidateInviteLink(request: UserIdMessage, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
}

export interface InviteServiceClient<CallOptionsExt = {}> {
  createInviteLink(
    request: DeepPartial<CreateInviteLinkRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Empty>;
  consumeInviteLink(
    request: DeepPartial<ConsumeInviteLinkRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConsumeInviteLinkResponse>;
  invalidateInviteLink(request: DeepPartial<UserIdMessage>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
