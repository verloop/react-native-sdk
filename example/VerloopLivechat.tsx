import React, {useEffect} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import VerloopSdk from 'react-native-verloop-sdk';

const VerloopLiveChat: React.FC = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      const module = NativeModules.RNVerloopSdk;
      if (module?.createAnonymousUserConfig) {
        VerloopSdk.createAnonymousUserConfig('your-client-id');
        VerloopSdk.showChat();
      } else {
        console.error('RNVerloopSdk not available in useEffect');
      }
    }
  }, []);

  useEffect(() => {
    const clientId = 'reactnative'; // Replace with your actual client ID
    // Initialize Verloop SDK
    VerloopSdk.createAnonymousUserConfig(clientId);
    // Set up event emitter with the raw native module
    const eventEmitter = new NativeEventEmitter(VerloopSdk);

    // Add listeners
    const buttonClickListener = eventEmitter.addListener(
      'veloop_button_clicked',
      event => {
        console.log('Button clicked event:', event, VerloopSdk);
        // VerloopSdk.clearChat && VerloopSdk.clearChat();
        VerloopSdk.logout();
        VerloopSdk.dismissChat();
      },
    );
    const urlClickListener = eventEmitter.addListener(
      'veloop_url_clicked',
      event => {
        console.log('URL clicked event:', event);
      },
    );

    // VerloopSdk.putCustomField('test1', 'value');
    // VerloopSdk.putCustomFieldWithScope('test2', 'value', 'USER');
    // VerloopSdk.setUserEmail('user@example.com');
    // VerloopSdk.setUserPhone('1234567890');
    // VerloopSdk.setUserName('Test User');

    // Enable listeners and show chat
    VerloopSdk.setButtonClickListener();
    VerloopSdk.setUrlClickListener();

    return () => {
      buttonClickListener.remove();
      urlClickListener.remove();
    };
  }, []);

  const handleChatButtonPress = () => {
    VerloopSdk.showChat();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={handleChatButtonPress}>
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  chatButton: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerloopLiveChat;
