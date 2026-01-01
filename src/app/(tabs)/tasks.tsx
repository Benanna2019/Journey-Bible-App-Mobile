import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLazyReference, useResult } from "@isograph/react";
import { Suspense } from "react";
import entrypoint from "@/components/__isograph/Query/TaskList/entrypoint";

function TaskListContent() {
  const { fragmentReference } = useLazyReference(entrypoint, {});
  const Component = useResult(fragmentReference);
  
  return <Component />;
}

function LoadingState() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#6366f1" />
      <Text className="mt-4 text-gray-500">Loading tasks...</Text>
    </View>
  );
}

export default function TasksScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-gray-500 mb-6">Your task list from the GraphQL API</Text>
        
        <Suspense fallback={<LoadingState />}>
          <TaskListContent />
        </Suspense>
      </View>
    </ScrollView>
  );
}

