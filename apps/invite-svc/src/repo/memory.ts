import { IInviteLink } from "types";
import { InviteLinkRepository } from "./base";

export class MemoryInviteLinkRepository implements InviteLinkRepository {
  links: Map<string, IInviteLink>;

  constructor() {
    this.links = new Map();
  }

  async getInviteLink(inviteLinkId: string) {
    const inviteLink = this.links.get(inviteLinkId);
    if (!inviteLink) return null;

    return inviteLink;
  }

  async createInviteLink(inviteLink: IInviteLink) {
    this.links.set(inviteLink._id, inviteLink);
  }

  async deleteInviteLink(inviteLinkId: string) {
    return this.links.delete(inviteLinkId);
  }
}
