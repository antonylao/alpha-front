export const RoutesBack =
{
  AuthController: {
    registerVolunteer: 'auth/signup/volunteer',
    loginVolunteer: 'auth/signin/volunteer',
    registerOrganiser: 'auth/signup/organiser',
    loginOrganiser: 'auth/signin/organiser',
    refreshToken: 'auth/refreshToken',
    signout: 'api/auth/signout',
    emailConfirmation: 'auth/signin/:userId/emailConfirmation'
  },
  TaskController: { getAllTasks: 'api/task' },
  UserController: {
    readAllVolunteersForOrganiserVolunteerIndex: 'api/organiserCheck/volunteer',
    readVolunteer: 'api/volunteer_profile',
    updateVolunteer: 'api/volunteer_profile',
    readVolunteerPassword: 'api/volunteer/change_password',
    updateVolunteerPassword: 'api/volunteer/change_password',
    applyWarning: 'api/organiserCheck/volunteer/:volunteerId/warning',
    applyBan: 'api/organiserCheck/volunteer/:volunteerId/ban',
    readOrganiser: 'api/organiser',
    updateOrganiser: 'api/organiser',
    readOrganiserPassword: 'api/organiser/change_password',
    updateOrganiserPassword: 'api/organiser/change_password'
  },
  VolunteerAssignmentController: {
    readPastEventsInfoForOrganiserVolunteerCard: 'api/organiserCheck/volunteer/:volunteerId/past_events',
    readAllComments: 'api/organiser/comments',
    readAllPendingRequests: 'organiser/pending_requests',
    updateRating: 'api/organiserCheck/volunteer/:volunteerId/past_events/:eventId/task/:taskId/rating',
    getFinishedAssignmentsInfo: 'api/volunteerCheck/volunteer/signedInId/my_events',
    updateComment: 'api/volunteerCheck/event/:eventId/task/:taskId/comment',
    createPendingVolunterAssignment: 'api/volunteerCheck/event/:eventId/task/:taskId',
    cancelAssignment: 'api/volunteerCheck/event/:eventId/task/:taskId/cancel'
  },
  EventController: {
    getAllEvents: 'api/event',
    getAllUpcomingEvents: 'api/volunteerCheck/event/upcoming',
    getEventById: 'api/event/:id',
    createEvent: 'api/event',
    updateEvent: 'api/event/:event_id',
    deleteEvent: 'api/event/:event_id',
    readCommentsByEventId: 'api/event/:event_id/comments',
    readRatingsByEventId: 'api/event/:event_id/ratings',
    updateRatingsByEventId: 'api/event/:event_id/task/:task_id/user/:user_id/rating',
    updateStatusByEventId: 'api/event/:event_id/task/:task_id/user/:user_id/status'
  },
  EventTaskController: {
    getUpcomingEventInfosForTaskApply: 'api/volunteerCheck/event/upcoming/:eventId/task',
    readEventTaskById: 'api/event/:event_id/task/:task_id',
    updateEventTaskProgressionById: 'api/event/:event_id/task/:task_id/progression',
    updateEventTaskRequiredVolunteersById: 'api/event/:event_id/task/:task_id/required_volunteers',
    deleteEventTaskById: 'api/event/:event_id/task/:task_id'
  }
}