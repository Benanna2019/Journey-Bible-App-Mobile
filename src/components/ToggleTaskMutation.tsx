import { iso } from "@iso";
import { View, Text } from "react-native";

/**
 * Mutation field for toggling a task's completion status.
 * Returns the updated task after the toggle.
 */
export const ToggleTaskMutation = iso(`
  field Mutation.ToggleTaskMutation($id: ID!) @component {
    toggleTask(id: $id) {
      _id
      text
      isCompleted
    }
  }
`)(({ data }) => {
  const task = data.toggleTask;
  
  if (!task) {
    return (
      <View className="p-2">
        <Text className="text-red-500">Task not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
      <Text className="text-xl">{task.isCompleted ? "✅" : "⬜"}</Text>
      <Text className={`flex-1 text-base ${task.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
        {task.text}
      </Text>
      <Text className="text-green-600 text-sm">Updated!</Text>
    </View>
  );
});

/**
 * Entrypoint for the toggle task mutation.
 * Use with useImperativeReference to trigger the mutation.
 */
export const ToggleTaskEntrypoint = iso(`
  entrypoint Mutation.ToggleTaskMutation
`);

