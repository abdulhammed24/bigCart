// import * as Keychain from 'react-native-keychain';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import { Platform } from 'react-native';
// import { randomBytes } from 'crypto';
// import { createCipheriv, createDecipheriv } from 'crypto';

// const KEYCHAIN_KEY = 'cardEncryptionKey';
// const ASYNC_STORAGE_KEY_EXISTS = 'hasEncryptionKey';

// // Generate a 32-byte random key for AES-256
// async function generateAndStoreKey(): Promise<string> {
//   try {
//     const key = randomBytes(32).toString('base64'); // 32 bytes for AES-256
//     await Keychain.setGenericPassword('encryption', key, {
//       service: KEYCHAIN_KEY,
//       accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
//       accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
//     });
//     await AsyncStorage.setItem(ASYNC_STORAGE_KEY_EXISTS, 'true');
//     console.log(
//       `[${Platform.OS}] Encryption key generated and stored successfully`,
//     );
//     return key;
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Error generating/storing key:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to generate encryption key');
//   }
// }

// // Retrieve or generate the encryption key
// async function getEncryptionKey(): Promise<string> {
//   try {
//     const hasKey = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_EXISTS);
//     if (hasKey === 'true') {
//       const credentials = await Keychain.getGenericPassword({
//         service: KEYCHAIN_KEY,
//       });
//       if (credentials && credentials.password) {
//         console.log(`[${Platform.OS}] Encryption key retrieved from Keychain`);
//         return credentials.password;
//       }
//     }
//     return await generateAndStoreKey();
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Error retrieving key:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to retrieve encryption key');
//   }
// }

// // Encrypt data with AES-256-CBC
// async function encryptField(data: string, keyBase64: string): Promise<string> {
//   try {
//     const key = Buffer.from(keyBase64, 'base64');
//     const iv = randomBytes(16); // 16-byte IV for AES-256-CBC
//     const cipher = createCipheriv('aes-256-cbc', key, iv);
//     let encrypted = cipher.update(data, 'utf8', 'base64');
//     encrypted += cipher.final('base64');
//     return `${iv.toString('base64')}:${encrypted}`;
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Encryption error:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to encrypt data');
//   }
// }

// // Decrypt data with AES-256-CBC
// async function decryptField(
//   encryptedData: string,
//   keyBase64: string,
// ): Promise<string> {
//   try {
//     const [ivBase64, cipher] = encryptedData.split(':');
//     if (!ivBase64 || !cipher) {
//       throw new Error('Invalid encrypted data format');
//     }
//     const key = Buffer.from(keyBase64, 'base64');
//     const iv = Buffer.from(ivBase64, 'base64');
//     const decipher = createDecipheriv('aes-256-cbc', key, iv);
//     let decrypted = decipher.update(cipher, 'base64', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Decryption error:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to decrypt data');
//   }
// }

// // Store/retrieve encrypted card data
// async function storeEncryptedCard(
//   cardId: string,
//   data: { cardNumber: string; cvv: string },
// ) {
//   try {
//     await EncryptedStorage.setItem(`card_${cardId}`, JSON.stringify(data));
//     console.log(`[${Platform.OS}] Card data stored securely for ID: ${cardId}`);
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Error storing card data:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to store card data');
//   }
// }

// async function getEncryptedCard(
//   cardId: string,
// ): Promise<{ cardNumber: string; cvv: string } | null> {
//   try {
//     const data = await EncryptedStorage.getItem(`card_${cardId}`);
//     if (data) {
//       console.log(`[${Platform.OS}] Card data retrieved for ID: ${cardId}`);
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error: any) {
//     console.error(`[${Platform.OS}] Error retrieving card data:`, {
//       message: error.message,
//       stack: error.stack,
//     });
//     throw new Error('Failed to retrieve card data');
//   }
// }

// export {
//   getEncryptionKey,
//   encryptField,
//   decryptField,
//   storeEncryptedCard,
//   getEncryptedCard,
// };
