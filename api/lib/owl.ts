import jose from "node-jose";
import config from "./config.ts";

async function loadKeyStore() {
    // Create a keystore
    const keystore = jose.JWK.createKeyStore();

    // Load the private key for decryption from environment variable
    const privateKey = config.owlKey;
    if (!privateKey) {
        throw new Error('Private key not found in environment variables');
    }
    await keystore.add(privateKey, 'pem');

    return keystore;
}

async function EncryptPayload(payload) {
    const JSONPayload = JSON.stringify(payload);

    try {
        // Load the keystore with the public key
        const keystore = await loadKeyStore();
        const key = keystore.all({ use: 'enc' })[0];

        if (!key) {
            throw new Error('Encryption key not found in keystore');
        }

        // Encrypt the payload
        const result = await jose.JWE.createEncrypt({ format: 'compact' }, key)
            .update(JSONPayload)
            .final();
        
        return result;
    } catch (err) {
        console.error('Error during encryption:', err);
        throw err;
    }
}

async function DecryptPayload(jwe) {
    try {
        // Load the keystore with the private key
        const keystore = await loadKeyStore();
        const key = keystore.all({ use: 'enc' })[0];

        if (!key) {
            throw new Error('Decryption key not found in keystore');
        }

        // Decrypt the JWE
        const result = await jose.JWE.createDecrypt(key)
            .decrypt(jwe);
        
        const decryptedPayload = result.payload.toString();
        console.log('Decrypted payload:', decryptedPayload);
        
        return decryptedPayload;
    } catch (err) {
        console.error('Decryption failed:', err);
        throw err;
    }
}

export { EncryptPayload, DecryptPayload };