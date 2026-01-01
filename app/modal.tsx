import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/themed-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>About Journey Bible</CardTitle>
          <CardDescription>A brief overview of the app</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemedText className="text-muted-foreground leading-6">
            Journey Bible is designed to help you engage with the scripture in a modern, 
            meaningful way. We provide tools for study, reflection, and community.
          </ThemedText>
        </CardContent>
        <View className="p-6 pt-0">
          <Button 
            className="w-full" 
            onPress={() => router.back()}
          >
            Close
          </Button>
        </View>
      </Card>
    </View>
  );
}
