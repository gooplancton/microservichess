import { IInviteLink } from "types";

export interface InviteLinkRepository {
  getInviteLink(inviteLinkId: string): Promise<IInviteLink | null>;
  createInviteLink(inviteLink: IInviteLink): Promise<void>;
  deleteInviteLink(inviteLinkId: string): Promise<boolean>;
}
