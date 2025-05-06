import { useEffect, useState } from "react";
import { decryptMessage } from "../util/encryption/decryptMessage";

export function useDecryption(data) {
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  useEffect(() => {
    async function decryptAll() {
      if (!data?.data?.messages) return;

      const decrypted = await Promise.all(
        data.data.messages.map(async (msg) => {
          try {
            const content = await decryptMessage(msg.content);
            return { ...msg, decryptedContent: content };
          } catch (err) {
            console.error("Failed to decrypt message", err);
            return { ...msg, decryptedContent: "[Decryption failed]" };
          }
        })
      );

      setDecryptedMessages(decrypted);
    }

    decryptAll();
  }, [data]);

  return { decryptedMessages };
}
