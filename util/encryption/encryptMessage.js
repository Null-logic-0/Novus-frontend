import * as openpgp from "openpgp";

const armoredKey = import.meta.env.VITE_RECIPIENT_PUBLIC_KEY.replace(
  /\\n/g,
  "\n"
);

export async function encryptMessage(text) {
  const publicKey = await openpgp.readKey({ armoredKey });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text }),
    encryptionKeys: publicKey,
  });

  return encrypted;
}
