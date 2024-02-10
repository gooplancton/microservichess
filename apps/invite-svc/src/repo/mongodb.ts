import { Collection, Filter, MongoClient } from "mongodb";
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

  async getInviteLink(inviterId: string, validOnly: boolean = true) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const filter: Filter<IInviteLink> = { inviterId }
    if (validOnly) filter.hasBeenConsumed = false

    const inviteLink = await this.invites.findOne(filter);

    return inviteLink;
  }

  async createInviteLink(inviteLink: IInviteLink) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    await this.invites.updateOne(
      { inviterId: inviteLink.inviterId },
      { $set: inviteLink },
      { upsert: true }
    )
  }

  async deleteInviteLink(inviterId: string) {
    if (!this.connected)
      throw new ServerError(Status.UNAVAILABLE, "not connected");

    const res = await this.invites.deleteOne({ inviterId });

    return res.deletedCount === 1;
  }
}
