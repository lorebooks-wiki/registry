// @deno-types="npm:@types/node-jose"
import jose from "node-jose";

const keystore = jose.JWK.createKeyStore();
const key = await keystore.generate("RSA", 4096)
console.log(key.toPEM(true))