import {combine} from "shamir-secret-sharing";

export interface CombineWorkerMessage {
  shares: Uint8Array[];
}

export interface CombineWorkerResult {
  secret: Uint8Array;
  error: any;
}

onmessage = async (e: MessageEvent<CombineWorkerMessage>) => {
  const { shares} = e.data;

  try {
    const secret = await combine(shares);
    postMessage({
      secret: secret,
      error: null,
    } as CombineWorkerResult);
  } catch (e) {
    postMessage({
      error: e,
    } as CombineWorkerResult);
  }
};