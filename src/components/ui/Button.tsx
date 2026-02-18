import {
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native"
import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  loading?: boolean
  disabled?: boolean
  className?: string
  textClassName?: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export function Button({
  children,
  onPress,
  variant = "primary",
  loading,
  disabled,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading

  // Get background and text colors based on variant
  const getBackgroundColor = () => {
    if (variant === "primary") return "#14F195" // Green for primary
    if (variant === "secondary") return "#4b5563"
    return "transparent"
  }

  const getTextColor = () => {
    if (variant === "primary") return "#0D0D12" // Dark for primary
    if (variant === "secondary") return "#ffffff"
    return "#60a5fa"
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        !isDisabled && pressed ? activeStyles[variant] : null,
        isDisabled ? styles.disabled : null,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#2563eb" : "#ffffff"}
        />
      ) : (
        <Text
          style={[textStyles[variant], { color: getTextColor() }, textStyle]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    alignSelf: "stretch",
    width: "100%",
    backgroundColor: "#2563eb",
    borderWidth: 1,
    borderColor: "#1d4ed8",
  },
  disabled: {
    opacity: 0.5,
  },
  primary: {
    backgroundColor: "#2563eb",
  },
  primaryActive: {
    backgroundColor: "#1d4ed8",
  },
  secondary: {
    backgroundColor: "#4b5563",
  },
  secondaryActive: {
    backgroundColor: "#374151",
  },
  outline: {
    borderWidth: 2,
    borderColor: "#2563eb",
    backgroundColor: "transparent",
  },
  outlineActive: {
    backgroundColor: "#1f2937",
  },
  textBase: {
    fontWeight: "600",
  },
  textPrimary: {
    color: "#ffffff",
  },
  textSecondary: {
    color: "#ffffff",
  },
  textOutline: {
    color: "#60a5fa",
  },
})

const variantStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
}

const activeStyles = {
  primary: styles.primaryActive,
  secondary: styles.secondaryActive,
  outline: styles.outlineActive,
}

const textStyles = {
  primary: [styles.textBase, styles.textPrimary],
  secondary: [styles.textBase, styles.textSecondary],
  outline: [styles.textBase, styles.textOutline],
}
