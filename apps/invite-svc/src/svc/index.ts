import { inviteProtos, gameProtos } from "protobufs";
import { InviteLinkRepository } from "../repo";
import { ServerError, Status } from "nice-grpc";
import { gameSettingsSchema, inviteLinkSchema } from "types";

export class InviteService implements inviteProtos.InviteServiceImplementation {
  repo: InviteLinkRepository;
  gameClient: gameProtos.GameServiceClient;

  constructor(
    repo: InviteLinkRepository,
    gameClient: gameProtos.GameServiceClient,
  ) {
    this.repo = repo;
    this.gameClient = gameClient;
  }

  async createInviteLink(request: inviteProtos.CreateInviteLinkRequest) {
    const { userId, playAs } = request;
    const gameSettingsParse = gameSettingsSchema.safeParse(
      request.gameSettings,
    );

    if (!gameSettingsParse.success)
      throw new ServerError(Status.INVALID_ARGUMENT, "invalid game settings");

    const gameSettings = gameSettingsParse.data;
    const inviteLink = inviteLinkSchema.parse({
      inviterId: userId,
      gameSettings,
      playAs,
    });

    await this.repo.createInviteLink(inviteLink);

    return {}
  }

  async consumeInviteLink(request: inviteProtos.ConsumeInviteLinkRequest) {
    const inviteLink = await this.repo.getInviteLink(request.inviterId, true);

    if (!inviteLink)
      throw new ServerError(
        Status.INVALID_ARGUMENT,
        "no such invite link found",
      );
    if (inviteLink.inviterId === request.userId)
      throw new ServerError(
        Status.INVALID_ARGUMENT,
        "cannot consume your own invite links",
      );

    const playAs = inviteLink.playAs ?? inviteProtos.PlayAs.RANDOM;
    const playAsWhiteAssignment = [inviteLink.inviterId, request.userId];
    const playAsBlackAsssignment = [request.userId, inviteLink.inviterId];
    const randomAssignment =
      Math.random() > 0.5 ? playAsWhiteAssignment : playAsBlackAsssignment;

    const [whitePlayerId, blackPlayerId] =
      playAs === inviteProtos.PlayAs.WHITE
        ? playAsWhiteAssignment
        : playAs === inviteProtos.PlayAs.BLACK
          ? playAsBlackAsssignment
          : randomAssignment;

    const gameCreationRequest: gameProtos.CreateGameRequest = {
      whitePlayerId: whitePlayerId!,
      blackPlayerId: blackPlayerId!,
      settings: inviteLink.gameSettings,
    };

    await this.repo.deleteInviteLink(inviteLink.inviterId);
    const { gameId } = await this.gameClient.createGame(gameCreationRequest);

    return {
      gameId,
      inviterId: inviteLink.inviterId,
    };
  }

  async invalidateInviteLink(request: inviteProtos.UserIdMessage) {
    const inviteLink = await this.repo.deleteInviteLink(request.userId)
    if (!inviteLink) throw new ServerError(Status.INVALID_ARGUMENT, "no such invite link found")

    return {}
  }
}
