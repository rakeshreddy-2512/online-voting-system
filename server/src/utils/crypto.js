import crypto from 'crypto';

const key = Buffer.from(process.env.VOTE_ENCRYPTION_KEY, 'utf8');

export const encryptVote = (payload) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    encryptedPayload: encrypted.toString('base64'),
    iv: iv.toString('base64'),
    authTag: authTag.toString('base64')
  };
};

export const decryptVote = ({ encryptedPayload, iv, authTag }) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64'));
  decipher.setAuthTag(Buffer.from(authTag, 'base64'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedPayload, 'base64')),
    decipher.final()
  ]);

  return JSON.parse(decrypted.toString('utf8'));
};
