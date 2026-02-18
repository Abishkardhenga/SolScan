import {
  View,
  ScrollView,
  ViewProps,
  StyleSheet,
  ViewStyle,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ReactNode } from "react"

interface ScreenProps extends ViewProps {
  children: ReactNode
  scrollable?: boolean
  className?: string
  contentStyle?: ViewStyle
}

export function Screen({
  children,
  scrollable = false,
  contentStyle,
  style,
  ...props
}: ScreenProps) {
  const Container = scrollable ? ScrollView : View

  return (
    <SafeAreaView style={[styles.safe, style]}>
      <Container
        style={scrollable ? styles.scroll : styles.container}
        contentContainerStyle={
          scrollable ? [styles.scrollContent, contentStyle] : undefined
        }
        {...props}
      >
        {children}
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
})
