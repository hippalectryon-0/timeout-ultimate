import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DevSettings, ScrollView, StyleSheet, Text, View } from 'react-native';

import theme from '../utils/theme.js';
import I18n from '../utils/i18n';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

export default () => {
  const [language, setlanguage] = useState('');

  useEffect(() => {
    (async function loadResults() {
      setlanguage(await AsyncStorage.getItem('language'));
    })();
  }, []);

  async function toggleLanguage() {
    const newLang = language === 'fr' ? 'en' : 'fr';
    await AsyncStorage.setItem('language', newLang);
    DevSettings.reload();
    RNRestart.Restart(); // doesn't work in dev, needs prev line
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button
          containerStyle={styles.button}
          titleStyle={styles.mainButtonText}
          title={I18n.t('settingsScreen.languageTo' + (language === 'fr' ? 'en' : 'fr'))}
          onPress={toggleLanguage}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.MAIN_COLOR,
  },
  headerText: {
    fontSize: theme.FONT_SIZE_L,
  },
  incentive: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_M,
  },
});
