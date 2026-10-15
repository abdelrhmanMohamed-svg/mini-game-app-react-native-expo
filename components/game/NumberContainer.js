import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Colors from '../../utils/Colors';

function NumberContainer({ children }) {
  const { width, height } = useWindowDimensions();
  const isCompact = width < 380 || height < 400;

  return (
    <View
      style={[
        styles.container,
        isCompact && styles.containerCompact,
      ]}
    >
      <Text style={[styles.numberText, isCompact && styles.numberTextCompact]}>
        {children}
      </Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCompact: {
    padding: 12,
    margin: 12,
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontFamily: 'open-sans-bold',
  },
  numberTextCompact: {
    fontSize: 28,
  },
});

