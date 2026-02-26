type fakerVolunteerAssignment = {
  userId: number,
  taskId: number,
  eventId: number,
  taskName: string,
  countValidatedAssignment: number
  nbVolunteersRequired: number
  volunteerAssignmentStatus: string | undefined
}

const fakerData: fakerVolunteerAssignment[] = [
  {
    userId: 1,
    taskId: 1,
    eventId: 1,
    taskName: "Mission 1",
    countValidatedAssignment: 3,
    nbVolunteersRequired: 4,
    volunteerAssignmentStatus: 'validé',
  },
  {
    userId: 1,
    taskId: 2,
    eventId: 1,
    taskName: "Mission 2",
    countValidatedAssignment: 3,
    nbVolunteersRequired: 4,
    volunteerAssignmentStatus: 'validé',
  },
  {
    userId: 1,
    taskId: 6,
    eventId: 1,
    taskName: "Mission 6",
    countValidatedAssignment: 3,
    nbVolunteersRequired: 4,
    volunteerAssignmentStatus: 'en attente',
  },
  {
    userId: 1,
    taskId: 5,
    eventId: 1,
    taskName: "Mission 5",
    countValidatedAssignment: 3,
    nbVolunteersRequired: 4,
    volunteerAssignmentStatus: 'en attente',
  },
]

const fakerVolunteerAssignments = {
  datas: fakerData,
  status: 200
}

export { fakerVolunteerAssignments }
