"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { restorePinHelper } from "@/hooks/useRestorePin";
import useCircleAuthData from "@/hooks/useCircleAuthData";

/**
 * Context State.
 */
interface ContextState {
  /**
   * W3s client context.
   */
  client: W3SSdk | undefined;
}

/**
 * Create Context.
 */
const W3sContext = createContext<ContextState>({ client: undefined });

const CircleClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<W3SSdk | undefined>(undefined);
  const { data } = useCircleAuthData();

  useEffect(() => {
    // Instantiate W3SSdk in useEffect because of Window Dependency
    if (!client) {
      const webClient = new W3SSdk();
      webClient?.setAppSettings({
        appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID!,
      });
      webClient?.setOnForgotPin(async () => {
        const challengeId = await restorePinHelper();
        if (challengeId) {
          webClient.execute(challengeId);
        }
      });
      setClient(webClient);
    }
  }, [client]);

  useEffect(() => {
    // When the session or clients updated
    // re-authenticate with WebSDK
    if (client && data) {
      client.setAuthentication({
        userToken: data.userToken,
        encryptionKey: data.encryptionKey,
      });
    }
  }, [client, data]);

  return (
    <W3sContext.Provider value={{ client }}>{children}</W3sContext.Provider>
  );
};

export default CircleClientProvider;

export const useW3sContext = () => {
  return useContext(W3sContext);
};
