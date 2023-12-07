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

export const protobufPackage = "";

export interface UserAuthRequestMessage {
  username: string;
  password: string;
  email: string;
}

export interface GuestAuthRequestMessage {
  username?: string | undefined;
}

export interface AuthResponseMessage {
  userId: string;
}

function createBaseUserAuthRequestMessage(): UserAuthRequestMessage {
  return { username: "", password: "", email: "" };
}

export const UserAuthRequestMessage = {
  encode(message: UserAuthRequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserAuthRequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserAuthRequestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserAuthRequestMessage {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: UserAuthRequestMessage): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserAuthRequestMessage>, I>>(base?: I): UserAuthRequestMessage {
    return UserAuthRequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserAuthRequestMessage>, I>>(object: I): UserAuthRequestMessage {
    const message = createBaseUserAuthRequestMessage();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseGuestAuthRequestMessage(): GuestAuthRequestMessage {
  return { username: undefined };
}

export const GuestAuthRequestMessage = {
  encode(message: GuestAuthRequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== undefined) {
      writer.uint32(10).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GuestAuthRequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuestAuthRequestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GuestAuthRequestMessage {
    return { username: isSet(object.username) ? globalThis.String(object.username) : undefined };
  },

  toJSON(message: GuestAuthRequestMessage): unknown {
    const obj: any = {};
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GuestAuthRequestMessage>, I>>(base?: I): GuestAuthRequestMessage {
    return GuestAuthRequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GuestAuthRequestMessage>, I>>(object: I): GuestAuthRequestMessage {
    const message = createBaseGuestAuthRequestMessage();
    message.username = object.username ?? undefined;
    return message;
  },
};

function createBaseAuthResponseMessage(): AuthResponseMessage {
  return { userId: "" };
}

export const AuthResponseMessage = {
  encode(message: AuthResponseMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthResponseMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthResponseMessage();
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

  fromJSON(object: any): AuthResponseMessage {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: AuthResponseMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AuthResponseMessage>, I>>(base?: I): AuthResponseMessage {
    return AuthResponseMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AuthResponseMessage>, I>>(object: I): AuthResponseMessage {
    const message = createBaseAuthResponseMessage();
    message.userId = object.userId ?? "";
    return message;
  },
};

export type UserServiceService = typeof UserServiceService;
export const UserServiceService = {
  userLogin: {
    path: "/UserService/UserLogin",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserAuthRequestMessage) => Buffer.from(UserAuthRequestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserAuthRequestMessage.decode(value),
    responseSerialize: (value: AuthResponseMessage) => Buffer.from(AuthResponseMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthResponseMessage.decode(value),
  },
  guestLogin: {
    path: "/UserService/GuestLogin",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GuestAuthRequestMessage) => Buffer.from(GuestAuthRequestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GuestAuthRequestMessage.decode(value),
    responseSerialize: (value: AuthResponseMessage) => Buffer.from(AuthResponseMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthResponseMessage.decode(value),
  },
  userSignup: {
    path: "/UserService/UserSignup",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserAuthRequestMessage) => Buffer.from(UserAuthRequestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserAuthRequestMessage.decode(value),
    responseSerialize: (value: AuthResponseMessage) => Buffer.from(AuthResponseMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthResponseMessage.decode(value),
  },
} as const;

export interface UserServiceServer extends UntypedServiceImplementation {
  userLogin: handleUnaryCall<UserAuthRequestMessage, AuthResponseMessage>;
  guestLogin: handleUnaryCall<GuestAuthRequestMessage, AuthResponseMessage>;
  userSignup: handleUnaryCall<UserAuthRequestMessage, AuthResponseMessage>;
}

export interface UserServiceClient extends Client {
  userLogin(
    request: UserAuthRequestMessage,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userLogin(
    request: UserAuthRequestMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userLogin(
    request: UserAuthRequestMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  guestLogin(
    request: GuestAuthRequestMessage,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  guestLogin(
    request: GuestAuthRequestMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  guestLogin(
    request: GuestAuthRequestMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userSignup(
    request: UserAuthRequestMessage,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userSignup(
    request: UserAuthRequestMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userSignup(
    request: UserAuthRequestMessage,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
}

export const UserServiceClient = makeGenericClientConstructor(UserServiceService, "UserService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UserServiceClient;
  service: typeof UserServiceService;
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
