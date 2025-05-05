import * as openpgp from "openpgp";

const armoredPrivateKey = import.meta.env.VITE_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);
const passphrase = import.meta.env.VITE_PRIVATE_KEY_PASSPHRASE;

console.log("Private Key:", armoredPrivateKey ? "Loaded" : "Not Loaded");
console.log("Passphrase:", passphrase ? "Loaded" : "Not Loaded");
console.log("Passphrase Loaded:", passphrase);
console.log("Passphrase Length:", passphrase.length);

// export async function decryptFile(encryptedBlob, fileType) {
//   const privateKey = await openpgp.decryptKey({
//     privateKey: await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey }),
//     passphrase,
//   });

//   const encryptedData = await encryptedBlob.arrayBuffer();

//   const message = await openpgp.readMessage({
//     binaryMessage: new Uint8Array(encryptedData),
//   });

//   const { data: decrypted } = await openpgp.decrypt({
//     message,
//     decryptionKeys: privateKey,
//     format: "binary",
//   });

//   return new Blob([decrypted], { type: fileType });
// }

// export async function decryptFile(
//   encryptedBlob,
//   fileType = "application/octet-stream"
// ) {
//   try {
//     const privateKey = await openpgp.decryptKey({
//       privateKey: await openpgp.readPrivateKey({
//         armoredKey: armoredPrivateKey,
//       }),
//       passphrase,
//     });

//     const encryptedData = await encryptedBlob.arrayBuffer();

//     const message = await openpgp.readMessage({
//       binaryMessage: new Uint8Array(encryptedData),
//     });

//     const { data: decrypted } = await openpgp.decrypt({
//       message,
//       decryptionKeys: privateKey,
//       format: "binary",
//     });

//     // Return the decrypted content with the specified file type
//     return new Blob([decrypted], { type: fileType });
//   } catch (err) {
//     console.error("Error decrypting file:", err);
//     throw new Error(
//       "Failed to decrypt the file. Invalid format or corrupted data."
//     );
//   }
// }

// import * as openpgp from "openpgp";

// const armoredPrivateKey = import.meta.env.VITE_PRIVATE_KEY.replace(
//   /\\n/g,
//   "\n"
// );
// const passphrase = import.meta.env.VITE_PRIVATE_KEY_PASSPHRASE;

export async function decryptFile(
  encryptedBlob,
  fileType = "application/octet-stream"
) {
  try {
    if (!armoredPrivateKey || !passphrase) {
      throw new Error("Missing private key or passphrase");
    }

    // Read + decrypt private key
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: armoredPrivateKey,
      }),
      passphrase,
    });

    const encryptedData = await encryptedBlob.arrayBuffer();

    const message = await openpgp.readMessage({
      binaryMessage: new Uint8Array(encryptedData), // For binary .pgp files
    });

    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKey,
      format: "binary", // Keeps it as a buffer
    });

    return new Blob([decrypted], { type: fileType });
  } catch (err) {
    console.error("Error decrypting file:", err);
    throw new Error(
      "Failed to decrypt the file. Make sure it's OpenPGP-encrypted and not Keybase-specific."
    );
  }
}
