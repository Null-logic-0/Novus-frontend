import * as openpgp from "openpgp";

const armoredPrivateKey = import.meta.env.VITE_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);
const passphrase = import.meta.env.VITE_PRIVATE_KEY_PASSPHRASE;

export async function decryptMessage(encryptedText) {
  const privateKey = await openpgp.readPrivateKey({
    armoredKey: armoredPrivateKey,
  });

  const decryptedKey = await openpgp.decryptKey({
    privateKey,
    passphrase,
  });

  const message = await openpgp.readMessage({
    armoredMessage: encryptedText,
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: decryptedKey,
  });

  return decrypted;
}
