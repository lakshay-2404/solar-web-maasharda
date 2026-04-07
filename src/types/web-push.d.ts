declare module "web-push" {
  interface WebPushSubscription {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }

  interface WebPushOptions {
    TTL?: number;
    urgency?: "very-low" | "low" | "normal" | "high";
    topic?: string;
  }

  const webPush: {
    setVapidDetails(subject: string, publicKey: string, privateKey: string): void;
    sendNotification(
      subscription: WebPushSubscription,
      payload?: string,
      options?: WebPushOptions
    ): Promise<void>;
  };

  export default webPush;
}
