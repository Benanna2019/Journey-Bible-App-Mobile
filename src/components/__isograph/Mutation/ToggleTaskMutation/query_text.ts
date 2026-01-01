export default 'mutation ToggleTaskMutation($id: ID!) {\
  toggleTask____id___v_id: toggleTask(id: $id) {\
    _id,\
    isCompleted,\
    text,\
  },\
}';