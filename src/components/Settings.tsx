import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Settings = () => {
  const { colors } = useTheme();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: colors.text }]}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={isEnabled ? colors.card : colors.border}
          ios_backgroundColor={colors.border}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/* Add more settings items here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18,
  },
});

export default Settings;
