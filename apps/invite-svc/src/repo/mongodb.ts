import { Collection, MongoClient } from "mongodb";
import { ServerError, Status } from "nice-grpc";
import { InviteLinkRepository } from "./base";
import { IInviteLink } from "types";

export class MongoDBInviteLinkRepository implements InviteLinkRepository {
  connected: boolean = false;
  invites: Collection<IInviteLink>;

  constructor(url: string) {
    const client = new MongoClient(url);
    client.connect().then(() => (this.connected = true));

    this.invites = client
      .db("microservichess")
      .collection<IInviteLink>("invites");
  }

  async getInviteLink(inviteLinkId: string) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const inviteLink = await this.invites.findOne({ _id: inviteLinkId });

    return inviteLink;
  }

  async createInviteLink(inviteLink: IInviteLink) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    await this.invites.insertOne(inviteLink);
  }

  async deleteInviteLink(inviteLinkId: string) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const res = await this.invites.deleteOne({ _id: inviteLinkId });

    return res.deletedCount === 1;
  }
}
