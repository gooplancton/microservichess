/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";
import { GameCreatedMessage, GameSettingsMessage } from "./game_svc";

export const protobufPackage = "";

export interface InviteSvcEmptyMessage {
}

export interface CreateInviteLinkMessage {
  userId: string;
  settings: GameSettingsMessage | undefined;
}

export interface ConsumeInviteLinkMessage {
  userId: string;
  inviterId: string;
}

export interface InviteLinkCreatedMessage {
  userId: string;
}

export interface InviteLinkConsumedMessage {
  gameId: string;
}

export interface InvalidateLinkMessage {
  userId: string;
}

function createBaseInviteSvcEmptyMessage(): InviteSvcEmptyMessage {
  return {};
}

export const InviteSvcEmptyMessage = {
  encode(_: InviteSvcEmptyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteSvcEmptyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteSvcEmptyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): InviteSvcEmptyMessage {
    return {};
  },

  toJSON(_: InviteSvcEmptyMessage): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<InviteSvcEmptyMessage>): InviteSvcEmptyMessage {
    return InviteSvcEmptyMessage.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<InviteSvcEmptyMessage>): InviteSvcEmptyMessage {
    const message = createBaseInviteSvcEmptyMessage();
    return message;
  },
};

function createBaseCreateInviteLinkMessage(): CreateInviteLinkMessage {
  return { userId: "", settings: undefined };
}

export const CreateInviteLinkMessage = {
  encode(message: CreateInviteLinkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.settings !== undefined) {
      GameSettingsMessage.encode(message.settings, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInviteLinkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInviteLinkMessage();
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

  fromJSON(object: any): CreateInviteLinkMessage {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      settings: isSet(object.settings) ? GameSettingsMessage.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: CreateInviteLinkMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.settings !== undefined) {
      obj.settings = GameSettingsMessage.toJSON(message.settings);
    }
    return obj;
  },

  create(base?: DeepPartial<CreateInviteLinkMessage>): CreateInviteLinkMessage {
    return CreateInviteLinkMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateInviteLinkMessage>): CreateInviteLinkMessage {
    const message = createBaseCreateInviteLinkMessage();
    message.userId = object.userId ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? GameSettingsMessage.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseConsumeInviteLinkMessage(): ConsumeInviteLinkMessage {
  return { userId: "", inviterId: "" };
}

export const ConsumeInviteLinkMessage = {
  encode(message: ConsumeInviteLinkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.inviterId !== "") {
      writer.uint32(18).string(message.inviterId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumeInviteLinkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumeInviteLinkMessage();
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

  fromJSON(object: any): ConsumeInviteLinkMessage {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      inviterId: isSet(object.inviterId) ? globalThis.String(object.inviterId) : "",
    };
  },

  toJSON(message: ConsumeInviteLinkMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.inviterId !== "") {
      obj.inviterId = message.inviterId;
    }
    return obj;
  },

  create(base?: DeepPartial<ConsumeInviteLinkMessage>): ConsumeInviteLinkMessage {
    return ConsumeInviteLinkMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConsumeInviteLinkMessage>): ConsumeInviteLinkMessage {
    const message = createBaseConsumeInviteLinkMessage();
    message.userId = object.userId ?? "";
    message.inviterId = object.inviterId ?? "";
    return message;
  },
};

function createBaseInviteLinkCreatedMessage(): InviteLinkCreatedMessage {
  return { userId: "" };
}

export const InviteLinkCreatedMessage = {
  encode(message: InviteLinkCreatedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteLinkCreatedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteLinkCreatedMessage();
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

  fromJSON(object: any): InviteLinkCreatedMessage {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: InviteLinkCreatedMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<InviteLinkCreatedMessage>): InviteLinkCreatedMessage {
    return InviteLinkCreatedMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InviteLinkCreatedMessage>): InviteLinkCreatedMessage {
    const message = createBaseInviteLinkCreatedMessage();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseInviteLinkConsumedMessage(): InviteLinkConsumedMessage {
  return { gameId: "" };
}

export const InviteLinkConsumedMessage = {
  encode(message: InviteLinkConsumedMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameId !== "") {
      writer.uint32(10).string(message.gameId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InviteLinkConsumedMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInviteLinkConsumedMessage();
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

  fromJSON(object: any): InviteLinkConsumedMessage {
    return { gameId: isSet(object.gameId) ? globalThis.String(object.gameId) : "" };
  },

  toJSON(message: InviteLinkConsumedMessage): unknown {
    const obj: any = {};
    if (message.gameId !== "") {
      obj.gameId = message.gameId;
    }
    return obj;
  },

  create(base?: DeepPartial<InviteLinkConsumedMessage>): InviteLinkConsumedMessage {
    return InviteLinkConsumedMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InviteLinkConsumedMessage>): InviteLinkConsumedMessage {
    const message = createBaseInviteLinkConsumedMessage();
    message.gameId = object.gameId ?? "";
    return message;
  },
};

function createBaseInvalidateLinkMessage(): InvalidateLinkMessage {
  return { userId: "" };
}

export const InvalidateLinkMessage = {
  encode(message: InvalidateLinkMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvalidateLinkMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvalidateLinkMessage();
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

  fromJSON(object: any): InvalidateLinkMessage {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: InvalidateLinkMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<InvalidateLinkMessage>): InvalidateLinkMessage {
    return InvalidateLinkMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<InvalidateLinkMessage>): InvalidateLinkMessage {
    const message = createBaseInvalidateLinkMessage();
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
      name: "createInviteLink",
      requestType: CreateInviteLinkMessage,
      requestStream: false,
      responseType: InviteLinkCreatedMessage,
      responseStream: false,
      options: {},
    },
    consumeInviteLink: {
      name: "consumeInviteLink",
      requestType: ConsumeInviteLinkMessage,
      requestStream: false,
      responseType: GameCreatedMessage,
      responseStream: false,
      options: {},
    },
    invalidateInviteLink: {
      name: "invalidateInviteLink",
      requestType: InvalidateLinkMessage,
      requestStream: false,
      responseType: InviteSvcEmptyMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface InviteServiceImplementation<CallContextExt = {}> {
  createInviteLink(
    request: CreateInviteLinkMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InviteLinkCreatedMessage>>;
  consumeInviteLink(
    request: ConsumeInviteLinkMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GameCreatedMessage>>;
  invalidateInviteLink(
    request: InvalidateLinkMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InviteSvcEmptyMessage>>;
}

export interface InviteServiceClient<CallOptionsExt = {}> {
  createInviteLink(
    request: DeepPartial<CreateInviteLinkMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InviteLinkCreatedMessage>;
  consumeInviteLink(
    request: DeepPartial<ConsumeInviteLinkMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GameCreatedMessage>;
  invalidateInviteLink(
    request: DeepPartial<InvalidateLinkMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InviteSvcEmptyMessage>;
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
