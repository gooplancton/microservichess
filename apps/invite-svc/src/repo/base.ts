import { IInviteLink } from "types";

export interface InviteLinkRepository {
  getInviteLink(inviterId: string, validOnly: boolean): Promise<IInviteLink | null>;
  createInviteLink(inviteLink: IInviteLink): Promise<void>;
  deleteInviteLink(inviteLinkId: string): Promise<boolean>;
}
