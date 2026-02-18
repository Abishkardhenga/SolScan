import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native"

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  inputStyle?: StyleProp<TextStyle>
  errorStyle?: StyleProp<TextStyle>
}

export function Input({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  placeholderTextColor,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, inputStyle]}
        placeholderTextColor={placeholderTextColor ?? "#6B7280"}
        {...props}
      />
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2A2A35",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#0F1117",
    color: "#FFFFFF",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#EF4444",
  },
})
