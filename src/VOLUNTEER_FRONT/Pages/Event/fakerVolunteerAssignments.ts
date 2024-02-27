const fakerData = [
  {
    volunteer_id: 1,
    task_id: 1,
    event_id: 1,
    task_name: "Task 1",
    volunteer_assignment_count_validated: 3,
    event_task_nb_volunteers_required: 4,
    volunteer_assignment_status: undefined,
  },
  {
    volunteer_id: 1,
    task_id: 2,
    event_id: 1,
    task_name: "Task 2",
    volunteer_assignment_count_validated: 3,
    event_task_nb_volunteers_required: 4,
    volunteer_assignment_status: 'validated',
  },
  {
    volunteer_id: 1,
    task_id: 6,
    event_id: 1,
    task_name: "Task 6",
    volunteer_assignment_count_validated: 3,
    event_task_nb_volunteers_required: 4,
    volunteer_assignment_status: 'pending',
  },
  {
    volunteer_id: 1,
    task_id: 5,
    event_id: 1,
    task_name: "Task 5",
    volunteer_assignment_count_validated: 3,
    event_task_nb_volunteers_required: 4,
    volunteer_assignment_status: undefined,
  },
]

const fakerVolunteerAssignments = {
  datas: fakerData,
  status: 200
}

export { fakerVolunteerAssignments }