import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context"
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      // NavigationGuard will handle redirect
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>Solscan Access</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <Input
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••••"
                autoComplete="password"
                error={error}
              />
            </View>
          </View>

          <Button
            onPress={handleLogin}
            loading={loading}
            variant="primary"
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          >
            Sign In
          </Button>

          <TouchableOpacity style={styles.quickButton} onPress={handleLogin}>
            <Text style={styles.quickButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            onPress={() => router.push("/(public)/signup")}
            variant="outline"
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          >
            Sign Up
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 40,
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#1A1F2B",
    borderWidth: 1,
    borderColor: "#2A2A35",
    marginBottom: 16,
  },
  pillText: {
    fontSize: 12,
    color: "#14F195",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#16161D",
    borderWidth: 1,
    borderColor: "#2A2A35",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginBottom: 24,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D1D5DB",
  },
  primaryButton: {
    backgroundColor: "#14F195",
    width: "100%",
    height: 48,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#0D0D12",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2A2A35",
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: "#6B7280",
  },
  secondaryButton: {
    borderColor: "#14F195",
  },
  secondaryButtonText: {
    color: "#14F195",
  },
  quickButton: {
    backgroundColor: "#10141B",
    borderWidth: 1,
    borderColor: "#2A2A35",
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  quickButtonText: {
    color: "#E5E7EB",
    fontSize: 15,
    fontWeight: "600",
  },
})
