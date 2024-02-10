import { IInviteLink } from "types";
import { InviteLinkRepository } from "./base";

export class MemoryInviteLinkRepository implements InviteLinkRepository {
  links: Map<string, IInviteLink>;

  constructor() {
    this.links = new Map();
  }

  async getInviteLink(inviteLinkId: string, validOnly: boolean = true) {
    const inviteLink = this.links.get(inviteLinkId);
    if (!inviteLink) return null;

    if (validOnly && inviteLink.hasBeenConsumed) return null;

    return inviteLink;
  }

  async createInviteLink(inviteLink: IInviteLink) {
    this.links.set(inviteLink.inviterId, inviteLink);
  }

  async deleteInviteLink(inviterId: string) {
    return this.links.delete(inviterId);
  }
}
