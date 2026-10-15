import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text style={styles.buttonText}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});

