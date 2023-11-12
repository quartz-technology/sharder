import {split} from "shamir-secret-sharing";

export interface SplitWorkerMessage {
  secret: Uint8Array;
  sharesNumber: number;
  reconstructionThreshold: number;
}

export interface SplitWorkerResult {
  shares: Uint8Array[];
  error: any;
}

onmessage = async (e: MessageEvent<SplitWorkerMessage>) => {
  const { secret, sharesNumber, reconstructionThreshold} = e.data;

  try {
    const shares = await split(secret, sharesNumber, reconstructionThreshold);
    postMessage({
      shares: shares,
      error: null,
    } as SplitWorkerResult);
  } catch (e) {
    postMessage({
      error: e,
    } as SplitWorkerResult);
  }
};