import { LoginEvent } from "@/domain/model/LoginEvent";
import { UserEvent } from "@/domain/model/UserEvent";

export type UserTracker = {
  track(
    event: UserEvent | LoginEvent,
    properties?: Record<string, unknown>
  ): void;
};
