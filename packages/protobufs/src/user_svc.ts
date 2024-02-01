/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserSignupRequest {
  username: string;
  password: string;
  email: string;
}

export interface GuestUsernameMsg {
  username?: string | undefined;
}

export interface GetUserMessage {
  userId: string;
}

export interface UserIdMsg {
  userId: string;
}

export interface GetUserInfoResponse {
  isGuest: boolean;
  username?: string | undefined;
  email?: string | undefined;
}

function createBaseUserLoginRequest(): UserLoginRequest {
  return { email: "", password: "" };
}

export const UserLoginRequest = {
  encode(message: UserLoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserLoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserLoginRequest();
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

  fromJSON(object: any): UserLoginRequest {
    return {
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserLoginRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create(base?: DeepPartial<UserLoginRequest>): UserLoginRequest {
    return UserLoginRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserLoginRequest>): UserLoginRequest {
    const message = createBaseUserLoginRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUserSignupRequest(): UserSignupRequest {
  return { username: "", password: "", email: "" };
}

export const UserSignupRequest = {
  encode(message: UserSignupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSignupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSignupRequest();
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

  fromJSON(object: any): UserSignupRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: UserSignupRequest): unknown {
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

  create(base?: DeepPartial<UserSignupRequest>): UserSignupRequest {
    return UserSignupRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserSignupRequest>): UserSignupRequest {
    const message = createBaseUserSignupRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseGuestUsernameMsg(): GuestUsernameMsg {
  return { username: undefined };
}

export const GuestUsernameMsg = {
  encode(message: GuestUsernameMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== undefined) {
      writer.uint32(10).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GuestUsernameMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGuestUsernameMsg();
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

  fromJSON(object: any): GuestUsernameMsg {
    return { username: isSet(object.username) ? globalThis.String(object.username) : undefined };
  },

  toJSON(message: GuestUsernameMsg): unknown {
    const obj: any = {};
    if (message.username !== undefined) {
      obj.username = message.username;
    }
    return obj;
  },

  create(base?: DeepPartial<GuestUsernameMsg>): GuestUsernameMsg {
    return GuestUsernameMsg.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GuestUsernameMsg>): GuestUsernameMsg {
    const message = createBaseGuestUsernameMsg();
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

function createBaseUserIdMsg(): UserIdMsg {
  return { userId: "" };
}

export const UserIdMsg = {
  encode(message: UserIdMsg, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserIdMsg {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserIdMsg();
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

  fromJSON(object: any): UserIdMsg {
    return { userId: isSet(object.userId) ? globalThis.String(object.userId) : "" };
  },

  toJSON(message: UserIdMsg): unknown {
    const obj: any = {};
    if (message.userId !== "") {
      obj.userId = message.userId;
    }
    return obj;
  },

  create(base?: DeepPartial<UserIdMsg>): UserIdMsg {
    return UserIdMsg.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UserIdMsg>): UserIdMsg {
    const message = createBaseUserIdMsg();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseGetUserInfoResponse(): GetUserInfoResponse {
  return { isGuest: false, username: undefined, email: undefined };
}

export const GetUserInfoResponse = {
  encode(message: GetUserInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): GetUserInfoResponse {
    return {
      isGuest: isSet(object.isGuest) ? globalThis.Boolean(object.isGuest) : false,
      username: isSet(object.username) ? globalThis.String(object.username) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
    };
  },

  toJSON(message: GetUserInfoResponse): unknown {
    const obj: any = {};
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

  create(base?: DeepPartial<GetUserInfoResponse>): GetUserInfoResponse {
    return GetUserInfoResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetUserInfoResponse>): GetUserInfoResponse {
    const message = createBaseGetUserInfoResponse();
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
      requestType: UserLoginRequest,
      requestStream: false,
      responseType: UserIdMsg,
      responseStream: false,
      options: {},
    },
    guestLogin: {
      name: "GuestLogin",
      requestType: GuestUsernameMsg,
      requestStream: false,
      responseType: UserIdMsg,
      responseStream: false,
      options: {},
    },
    userSignup: {
      name: "UserSignup",
      requestType: UserSignupRequest,
      requestStream: false,
      responseType: UserIdMsg,
      responseStream: false,
      options: {},
    },
    getUserInfo: {
      name: "GetUserInfo",
      requestType: UserIdMsg,
      requestStream: false,
      responseType: GetUserInfoResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface UserServiceImplementation<CallContextExt = {}> {
  userLogin(request: UserLoginRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UserIdMsg>>;
  guestLogin(request: GuestUsernameMsg, context: CallContext & CallContextExt): Promise<DeepPartial<UserIdMsg>>;
  userSignup(request: UserSignupRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UserIdMsg>>;
  getUserInfo(request: UserIdMsg, context: CallContext & CallContextExt): Promise<DeepPartial<GetUserInfoResponse>>;
}

export interface UserServiceClient<CallOptionsExt = {}> {
  userLogin(request: DeepPartial<UserLoginRequest>, options?: CallOptions & CallOptionsExt): Promise<UserIdMsg>;
  guestLogin(request: DeepPartial<GuestUsernameMsg>, options?: CallOptions & CallOptionsExt): Promise<UserIdMsg>;
  userSignup(request: DeepPartial<UserSignupRequest>, options?: CallOptions & CallOptionsExt): Promise<UserIdMsg>;
  getUserInfo(request: DeepPartial<UserIdMsg>, options?: CallOptions & CallOptionsExt): Promise<GetUserInfoResponse>;
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
