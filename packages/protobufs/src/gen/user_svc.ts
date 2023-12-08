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

export interface UserLoginRequestMessage {
  email: string;
  password: string;
}

export interface UserSignupRequestMessage {
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

function createBaseUserLoginRequestMessage(): UserLoginRequestMessage {
  return { email: "", password: "" };
}

export const UserLoginRequestMessage = {
  encode(message: UserLoginRequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserLoginRequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserLoginRequestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserLoginRequestMessage {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserLoginRequestMessage): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserLoginRequestMessage>, I>>(base?: I): UserLoginRequestMessage {
    return UserLoginRequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserLoginRequestMessage>, I>>(object: I): UserLoginRequestMessage {
    const message = createBaseUserLoginRequestMessage();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUserSignupRequestMessage(): UserSignupRequestMessage {
  return { username: "", password: "", email: "" };
}

export const UserSignupRequestMessage = {
  encode(message: UserSignupRequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSignupRequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSignupRequestMessage();
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

  fromJSON(object: any): UserSignupRequestMessage {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: UserSignupRequestMessage): unknown {
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

  create<I extends Exact<DeepPartial<UserSignupRequestMessage>, I>>(base?: I): UserSignupRequestMessage {
    return UserSignupRequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserSignupRequestMessage>, I>>(object: I): UserSignupRequestMessage {
    const message = createBaseUserSignupRequestMessage();
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
    requestSerialize: (value: UserLoginRequestMessage) => Buffer.from(UserLoginRequestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserLoginRequestMessage.decode(value),
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
    requestSerialize: (value: UserSignupRequestMessage) => Buffer.from(UserSignupRequestMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserSignupRequestMessage.decode(value),
    responseSerialize: (value: AuthResponseMessage) => Buffer.from(AuthResponseMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AuthResponseMessage.decode(value),
  },
} as const;

export interface UserServiceServer extends UntypedServiceImplementation {
  userLogin: handleUnaryCall<UserLoginRequestMessage, AuthResponseMessage>;
  guestLogin: handleUnaryCall<GuestAuthRequestMessage, AuthResponseMessage>;
  userSignup: handleUnaryCall<UserSignupRequestMessage, AuthResponseMessage>;
}

export interface UserServiceClient extends Client {
  userLogin(
    request: UserLoginRequestMessage,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userLogin(
    request: UserLoginRequestMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userLogin(
    request: UserLoginRequestMessage,
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
    request: UserSignupRequestMessage,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userSignup(
    request: UserSignupRequestMessage,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AuthResponseMessage) => void,
  ): ClientUnaryCall;
  userSignup(
    request: UserSignupRequestMessage,
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
