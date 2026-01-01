import { iso } from "@iso";

/**
 * Entrypoint for fetching and rendering the task list.
 * Use this with useLazyReference in your route.
 */
export const TaskListRoute = iso(`
  entrypoint Query.TaskList
`);
