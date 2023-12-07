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
import { GameSettingsMessage } from "./game_svc";

export const protobufPackage = "";

export interface EmptyMessage {
}

export interface CreateInviteLinkMessage {
  userId: string;
  settings: GameSettingsMessage | undefined;
}

export interface ConsumeInviteLinkMessage {
  userId: string;
  inviterId: string;
}

export interface InviteLinkConsumedMessage {
  gameId: string;
}

export interface InvalidateLinkMessage {
  userId: string;
}

function createBaseEmptyMessage(): EmptyMessage {
  return {};
}

export const EmptyMessage = {
  encode(_: EmptyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyMessage();
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

  fromJSON(_: any): EmptyMessage {
    return {};
  },

  toJSON(_: EmptyMessage): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<EmptyMessage>, I>>(base?: I): EmptyMessage {
    return EmptyMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EmptyMessage>, I>>(_: I): EmptyMessage {
    const message = createBaseEmptyMessage();
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

  create<I extends Exact<DeepPartial<CreateInviteLinkMessage>, I>>(base?: I): CreateInviteLinkMessage {
    return CreateInviteLinkMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateInviteLinkMessage>, I>>(object: I): CreateInviteLinkMessage {
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

  create<I extends Exact<DeepPartial<ConsumeInviteLinkMessage>, I>>(base?: I): ConsumeInviteLinkMessage {
    return ConsumeInviteLinkMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ConsumeInviteLinkMessage>, I>>(object: I): ConsumeInviteLinkMessage {
    const message = createBaseConsumeInviteLinkMessage();
    message.userId = object.userId ?? "";
    message.inviterId = object.inviterId ?? "";
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

  create<I extends Exact<DeepPartial<InviteLinkConsumedMessage>, I>>(base?: I): InviteLinkConsumedMessage {
    return InviteLinkConsumedMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InviteLinkConsumedMessage>, I>>(object: I): InviteLinkConsumedMessage {
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

  create<I extends Exact<DeepPartial<InvalidateLinkMessage>, I>>(base?: I): InvalidateLinkMessage {
    return InvalidateLinkMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InvalidateLinkMessage>, I>>(object: I): InvalidateLinkMessage {
    const message = createBaseInvalidateLinkMessage();
    message.userId = object.userId ?? "";
    return message;
  },
};

export type InviteServiceService = typeof InviteServiceService;
export const InviteServiceService = {
  createInviteLink: {
    path: "/InviteService/createInviteLink",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateInviteLinkMessage) => Buffer.from(CreateInviteLinkMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateInviteLinkMessage.decode(value),
    responseSerialize: (value: EmptyMessage) => Buffer.from(EmptyMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => EmptyMessage.decode(value),
  },
  consumeInviteLink: {
    path: "/InviteService/consumeInviteLink",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ConsumeInviteLinkMessage) => Buffer.from(ConsumeInviteLinkMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ConsumeInviteLinkMessage.decode(value),
    responseSerialize: (value: EmptyMessage) => Buffer.from(EmptyMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => EmptyMessage.decode(value),
  },
  invalidateInviteLink: {
    path: "/InviteService/invalidateInviteLink",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: InvalidateLinkMessage) => Buffer.from(InvalidateLinkMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => InvalidateLinkMessage.decode(value),
    responseSerialize: (value: EmptyMessage) => Buffer.from(EmptyMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => EmptyMessage.decode(value),
  },
} as const;

export interface InviteServiceServer extends UntypedServiceImplementation {
  createInviteLink: handleUnaryCall<CreateInviteLinkMessage, EmptyMessage>;
  consumeInviteLink: handleUnaryCall<ConsumeInviteLinkMessage, EmptyMessage>;
  invalidateInviteLink: handleUnaryCall<InvalidateLinkMessage, EmptyMessage>;
}

export interface InviteServiceClient extends Client {
  createInviteLink(
    request: CreateInviteLinkMessage,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  createInviteLink(
    request: CreateInviteLinkMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  createInviteLink(
    request: CreateInviteLinkMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  consumeInviteLink(
    request: ConsumeInviteLinkMessage,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  consumeInviteLink(
    request: ConsumeInviteLinkMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  consumeInviteLink(
    request: ConsumeInviteLinkMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  invalidateInviteLink(
    request: InvalidateLinkMessage,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  invalidateInviteLink(
    request: InvalidateLinkMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
  invalidateInviteLink(
    request: InvalidateLinkMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: EmptyMessage) => void,
  ): ClientUnaryCall;
}

export const InviteServiceClient = makeGenericClientConstructor(InviteServiceService, "InviteService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): InviteServiceClient;
  service: typeof InviteServiceService;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
