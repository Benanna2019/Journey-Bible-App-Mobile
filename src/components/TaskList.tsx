import { iso } from "@iso";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useImperativeReference } from "@isograph/react";
import { useState, useEffect } from "react";
import entrypoint from "@/components/__isograph/Mutation/ToggleTaskMutation/entrypoint";

/**
 * A single task item with toggle functionality
 */
function TaskItem({ 
  task, 
  onToggled 
}: { 
  task: { _id: string; text: string; isCompleted: boolean };
  onToggled?: (taskId: string, newStatus: boolean) => void;
}) {
  const [isToggling, setIsToggling] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<boolean | null>(null);
  
  const {
    fragmentReference: mutationRef,
    loadFragmentReference: toggleTask,
  } = useImperativeReference(entrypoint);

  // Watch for mutation completion
  useEffect(() => {
    if (mutationRef != null && isToggling) {
      // Mutation completed - update optimistic state and reset loading
      setOptimisticStatus(!task.isCompleted);
      setIsToggling(false);
      onToggled?.(task._id, !task.isCompleted);
    }
  }, [mutationRef, isToggling, task._id, task.isCompleted, onToggled]);

  const handleToggle = () => {
    if (isToggling) return; // Prevent double-tap
    
    setIsToggling(true);
    // Set optimistic update immediately
    setOptimisticStatus(!task.isCompleted);
    
    toggleTask(
      { id: task._id },
      { shouldFetch: "Yes" }
    );
  };

  // Use optimistic status if available, otherwise use the actual task status
  const displayStatus = optimisticStatus ?? task.isCompleted;

  return (
    <TouchableOpacity
      onPress={handleToggle}
      activeOpacity={0.7}
      disabled={isToggling}
      className={`flex-row items-center gap-3 p-3 bg-white rounded-lg shadow-sm border ${
        isToggling ? "border-indigo-200 bg-indigo-50" : "border-gray-100"
      }`}
    >
      {isToggling ? (
        <ActivityIndicator size="small" color="#6366f1" />
      ) : (
        <Text className="text-xl">{displayStatus ? "✅" : "⬜"}</Text>
      )}
      <Text
        className={`flex-1 text-base ${displayStatus ? "line-through text-gray-400" : "text-gray-800"}`}
      >
        {task.text}
      </Text>
      {!isToggling && (
        <Text className="text-gray-400 text-xs">Tap to toggle</Text>
      )}
    </TouchableOpacity>
  );
}

/**
 * A field component that renders a list of tasks.
 * This is selected by the TaskListRoute entrypoint.
 */
export const TaskList = iso(`
  field Query.TaskList @component {
    tasks {
      _id
      text
      isCompleted
    }
  }
`)(function TaskListComponent({ data }) {
  // Track local state for optimistic updates
  const [taskStates, setTaskStates] = useState<Record<string, boolean>>({});

  const handleTaskToggled = (taskId: string, newStatus: boolean) => {
    setTaskStates(prev => ({ ...prev, [taskId]: newStatus }));
  };

  if (!data.tasks || data.tasks.length === 0) {
    return (
      <View className="p-4">
        <Text className="text-gray-500 text-center">
          No tasks yet. Create one in the GraphQL playground!
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      {data.tasks.map((task) => {
        // Use local state if available, otherwise use server state
        const currentStatus = taskStates[task._id] ?? task.isCompleted;
        return (
          <TaskItem 
            key={task._id} 
            task={{ ...task, isCompleted: currentStatus }} 
            onToggled={handleTaskToggled}
          />
        );
      })}
    </View>
  );
});
