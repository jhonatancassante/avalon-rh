import {
    createCipheriv,
    createDecipheriv,
    randomBytes,
    scryptSync,
} from "crypto";

const CRYPTO_KEY = process.env.CRYPTO_KEY;

if (!CRYPTO_KEY) {
    throw new Error(
        "A chave de criptografia (CRYPTO_KEY) não está definida no .env",
    );
}

const ENCRYPTION_KEY: Buffer = scryptSync(CRYPTO_KEY, "salt", 32);
const IV: Buffer = randomBytes(12);

export const encrypt = (text: string): string => {
    const cipher = createCipheriv("aes-256-gcm", ENCRYPTION_KEY, IV);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    return `${IV.toString("hex")}:${authTag}:${encrypted}`;
};

export const decrypt = (encryptedText: string): string => {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(":");

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};
