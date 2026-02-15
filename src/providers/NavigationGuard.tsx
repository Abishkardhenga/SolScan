import { useEffect, useState, ReactNode } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { View } from 'react-native';
import { Loader } from '@/components/ui/Loader';

interface NavigationGuardProps {
  children: ReactNode;
}

export function NavigationGuard({ children }: NavigationGuardProps) {
  const { user, loading: authLoading } = useAuth();
  const { completed, loading: onboardingLoading } = useOnboarding();
  const segments = useSegments();
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [lastNavigatedRoute, setLastNavigatedRoute] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || onboardingLoading) return;

    const inProtected = segments[0] === '(protected)';
    const inPublic = segments[0] === '(public)';

    let targetRoute: string | null = null;

    // Determine target route
    if (!completed && !inPublic) {
      targetRoute = '/(public)/onboarding';
    } else if (completed && !user && !inPublic) {
      targetRoute = '/(public)/login';
    } else if (user && !inProtected) {
      targetRoute = '/(protected)';
    }

    // Only navigate if target route is different from last navigated route
    if (targetRoute && targetRoute !== lastNavigatedRoute) {
      setLastNavigatedRoute(targetRoute);
      router.replace(targetRoute);
    }

    setIsNavigationReady(true);
  }, [user, completed, authLoading, onboardingLoading, lastNavigatedRoute]);

  // Show splash while determining route
  if (!isNavigationReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Loader />
      </View>
    );
  }

  return <>{children}</>;
}
