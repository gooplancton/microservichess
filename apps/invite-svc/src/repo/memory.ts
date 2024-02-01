import { IInviteLink } from "types";
import { InviteLinkRepository } from "./base";

export class MemoryInviteLinkRepository implements InviteLinkRepository {
  links: Map<string, IInviteLink>;

  constructor() {
    this.links = new Map();
  }

  async getInviteLink(inviteLinkId: string): Promise<IInviteLink | null> {
    const inviteLink = this.links.get(inviteLinkId);
    if (!inviteLink) return null;

    return inviteLink;
  }

  async createInviteLink(inviteLink: IInviteLink): Promise<void> {
    this.links.set(inviteLink._id, inviteLink);
  }

  async deleteInviteLink(inviteLinkId: string): Promise<IInviteLink | null> {
    const inviteLink = this.links.get(inviteLinkId);
    if (!inviteLink) return null;

    this.links.delete(inviteLinkId);

    return inviteLink;
  }
}
