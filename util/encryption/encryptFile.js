// import * as openpgp from "openpgp";

// const armoredKey = import.meta.env.VITE_RECIPIENT_PUBLIC_KEY.replace(
//   /\\n/g,
//   "\n"
// );

// export async function encryptFile(file) {
//   const publicKey = await openpgp.readKey({ armoredKey });

//   const fileData = await file.arrayBuffer();
//   const encrypted = await openpgp.encrypt({
//     message: await openpgp.createMessage({ binary: new Uint8Array(fileData) }),
//     encryptionKeys: publicKey,
//     format: "binary",
//   });

//   return new Blob([encrypted], { type: file.type });
// }

import * as openpgp from "openpgp";

const armoredKey = import.meta.env.VITE_RECIPIENT_PUBLIC_KEY.replace(
  /\\n/g,
  "\n"
);

export async function encryptFile(file) {
  const publicKey = await openpgp.readKey({ armoredKey });

  const fileData = await file.arrayBuffer();

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ binary: new Uint8Array(fileData) }),
    encryptionKeys: publicKey,
    config: {
      preferredCompressionAlgorithm: openpgp.enums.compression.zip, // better compatibility
    },
    format: "binary", // binary = Uint8Array output
  });

  return new Blob([encrypted], { type: file.type });
}
