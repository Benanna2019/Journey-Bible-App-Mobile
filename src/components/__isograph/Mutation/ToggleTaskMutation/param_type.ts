import type { Mutation__ToggleTaskMutation__parameters } from './parameters_type';

export type Mutation__ToggleTaskMutation__param = {
  readonly data: {
    /**
Toggle task completion
    */
    readonly toggleTask: ({
      readonly _id: string,
      readonly text: string,
      readonly isCompleted: boolean,
    } | null),
  },
  readonly parameters: Mutation__ToggleTaskMutation__parameters,
};
