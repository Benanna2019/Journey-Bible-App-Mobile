
export type Query__TaskList__param = {
  readonly data: {
    /**
List all tasks - no auth required (for testing)
    */
    readonly tasks: ReadonlyArray<{
      readonly _id: string,
      readonly text: string,
      readonly isCompleted: boolean,
    }>,
  },
  readonly parameters: Record<PropertyKey, never>,
};
