import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { View, ScrollView } from 'react-native'
import { SignOutButton } from '@/components/sign-out-button'
import { Button } from "@/components/ui/button"
import { ThemedText } from "@/components/themed-text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const { user } = useUser()

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-6 py-12">
        <SignedIn>
          <View className="items-center justify-center">
            <ThemedText className="text-3xl font-bold text-primary mb-2">Welcome Back!</ThemedText>
            <ThemedText className="text-muted-foreground mb-8 text-center">
              {user?.emailAddresses[0].emailAddress}
            </ThemedText>
            
            <Card className="w-full mb-8">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>You are doing great on your journey.</CardDescription>
              </CardHeader>
              <CardContent>
                <ThemedText className="text-muted-foreground">
                  Continue where you left off in the bible study section.
                </ThemedText>
              </CardContent>
            </Card>

            <View className="w-full gap-y-4">
              <Link href="/(tabs)" asChild>
                <Button size="lg" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
              
              <SignOutButton />
            </View>
          </View>
        </SignedIn>
        
        <SignedOut>
          <View className="items-center justify-center min-h-[60vh]">
            <ThemedText className="text-5xl font-extrabold text-primary text-center">Journey Bible</ThemedText>
            <ThemedText className="text-xl text-muted-foreground mt-4 text-center px-4">
              A modern bible study experience for your spiritual growth.
            </ThemedText>
          </View>

          <View className="gap-y-4 mt-8">
            <Link href="/(auth)/sign-in" asChild>
              <Button size="lg" className="w-full">
                Get Started
              </Button>
            </Link>

            <Link href="/(auth)/sign-up" asChild>
              <Button variant="outline" size="lg" className="w-full">
                Create an Account
              </Button>
            </Link>
          </View>
        </SignedOut>
      </View>
    </ScrollView>
  )
}
