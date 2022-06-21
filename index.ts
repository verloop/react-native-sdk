
import { NativeModules } from 'react-native';

const { RNVerloopSdk } = NativeModules;

const VerloopSdk = RNVerloopSdk;

interface VerloopSdkInterface {
  createUserConfig(clientId: string,  userId:string ): void;
}

export default VerloopSdk as VerloopSdkInterface;
