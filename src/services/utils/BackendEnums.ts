//dont forget errorName enum!

export enum EventType {
  CONCERT = 1,
  THEATRE = 2,
  STANDUP = 3
}

export enum EventTaskProgression {
  NOT_STARTED = 1,
  IN_PROGRESS = 2,
  AWAITING_CONFIRMATION = 3,
  COMPLETED = 4
}

export enum UserRole {
  ORGANISER = 1,
  VOLUNTEER = 2
}

export enum VolunteerAssignmentStatus {
  PENDING = 1,
  ACCEPTED = 2,
  REFUSED = 3,
  CANCELED = 4
}

export enum ErrorName {
  JWT_TOKEN_EXPIRED = "TokenExpiredError",
}

