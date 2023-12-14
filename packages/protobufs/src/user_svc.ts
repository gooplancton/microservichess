/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
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

export interface GetUserMessage {
  userId: string;
}

export interface AuthResponseMessage {
  userId: string;
}

export interface UserRecordMessage {
  userId: string;
  isGuest: boolean;
  username?: string | undefined;
  email?: string | undefined;
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

  create(base?: DeepPartial<UserLoginRequestMessage>): UserLoginRequestMessage {
    return UserLoginRequestMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserLoginRequestMessage>): UserLoginRequestMessage {
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

  create(base?: DeepPartial<UserSignupRequestMessage>): UserSignupRequestMessage {
    return UserSignupRequestMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserSignupRequestMessage>): UserSignupRequestMessage {
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

  create(base?: DeepPartial<GuestAuthRequestMessage>): GuestAuthRequestMessage {
    return GuestAuthRequestMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GuestAuthRequestMessage>): GuestAuthRequestMessage {
    const message = createBaseGuestAuthRequestMessage();
    message.username = object.username ?? undefined;
    return message;
  },
};

function createBaseGetUserMessage(): GetUserMessage {
  return { userId: "" };
}

export const GetUserMessage = {
  encode(message: GetUserMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserMessage();
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

  fromJSON(object: any): GetUserMessage {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: GetUserMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<GetUserMessage>): GetUserMessage {
    return GetUserMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetUserMessage>): GetUserMessage {
    const message = createBaseGetUserMessage();
    message.userId = object.userId ?? "";
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

  create(base?: DeepPartial<AuthResponseMessage>): AuthResponseMessage {
    return AuthResponseMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AuthResponseMessage>): AuthResponseMessage {
    const message = createBaseAuthResponseMessage();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserRecordMessage(): UserRecordMessage {
  return { userId: "", isGuest: false, username: undefined, email: undefined };
}

export const UserRecordMessage = {
  encode(message: UserRecordMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.isGuest === true) {
      writer.uint32(16).bool(message.isGuest);
    }
    if (message.username !== undefined) {
      writer.uint32(26).string(message.username);
    }
    if (message.email !== undefined) {
      writer.uint32(34).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserRecordMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserRecordMessage();
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
          if (tag !== 16) {
            break;
          }

          message.isGuest = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): UserRecordMessage {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : "",
      isGuest: isSet(object.isGuest) ? globalThis.Boolean(object.isGuest) : false,
      username: isSet(object.username) ? globalThis.String(object.username) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
    };
  },

  toJSON(message: UserRecordMessage): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.isGuest === true) {
      obj.isGuest = message.isGuest;
    }
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    return obj;
  },

  create(base?: DeepPartial<UserRecordMessage>): UserRecordMessage {
    return UserRecordMessage.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserRecordMessage>): UserRecordMessage {
    const message = createBaseUserRecordMessage();
    message.userId = object.userId ?? "";
    message.isGuest = object.isGuest ?? false;
    message.username = object.username ?? undefined;
    message.email = object.email ?? undefined;
    return message;
  },
};

export type UserServiceDefinition = typeof UserServiceDefinition;
export const UserServiceDefinition = {
  name: "UserService",
  fullName: "UserService",
  methods: {
    userLogin: {
      name: "UserLogin",
      requestType: UserLoginRequestMessage,
      requestStream: false,
      responseType: AuthResponseMessage,
      responseStream: false,
      options: {},
    },
    guestLogin: {
      name: "GuestLogin",
      requestType: GuestAuthRequestMessage,
      requestStream: false,
      responseType: AuthResponseMessage,
      responseStream: false,
      options: {},
    },
    userSignup: {
      name: "UserSignup",
      requestType: UserSignupRequestMessage,
      requestStream: false,
      responseType: AuthResponseMessage,
      responseStream: false,
      options: {},
    },
    getUser: {
      name: "GetUser",
      requestType: GetUserMessage,
      requestStream: false,
      responseType: UserRecordMessage,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface UserServiceImplementation<CallContextExt = {}> {
  userLogin(
    request: UserLoginRequestMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthResponseMessage>>;
  guestLogin(
    request: GuestAuthRequestMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthResponseMessage>>;
  userSignup(
    request: UserSignupRequestMessage,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthResponseMessage>>;
  getUser(request: GetUserMessage, context: CallContext & CallContextExt): Promise<DeepPartial<UserRecordMessage>>;
}

export interface UserServiceClient<CallOptionsExt = {}> {
  userLogin(
    request: DeepPartial<UserLoginRequestMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthResponseMessage>;
  guestLogin(
    request: DeepPartial<GuestAuthRequestMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthResponseMessage>;
  userSignup(
    request: DeepPartial<UserSignupRequestMessage>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthResponseMessage>;
  getUser(request: DeepPartial<GetUserMessage>, options?: CallOptions & CallOptionsExt): Promise<UserRecordMessage>;
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
