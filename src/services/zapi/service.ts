import axios, { AxiosError, AxiosInstance } from "axios";
import {
  SendOptionListInput,
  SendTextInput,
  ZApiClientOptions,
  ZApiResponse,
} from "./model";

const RAW_BASE = process.env.BACKEND_Z_API_URL ?? "";
const BACKEND_ZAPI_CLIENT_TOKEN = process.env.BACKEND_ZAPI_CLIENT_TOKEN ?? "";

function sanitizeBase(url: string): string {
  return url.replace(/\/{2,}/g, "/").replace(/\/$/, "");
}

class ZApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = sanitizeBase(RAW_BASE);
  }

  private createClient({ instanceId, token }: ZApiClientOptions = {}): AxiosInstance {
    let url = this.baseURL;

    if (instanceId && token) {
      url = sanitizeBase(`${url}/${instanceId}/token/${token}`);
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Client-Token": BACKEND_ZAPI_CLIENT_TOKEN,
    };

    return axios.create({
      baseURL: url,
      headers,
      timeout: 15_000, // 15s
    });
  }

  public async sendText({
    instanceId,
    token,
    phone,
    message,
  }: SendTextInput): Promise<ZApiResponse> {
    if (!instanceId || !token) {
      return { ok: false, error: "Instance ID and token are required" };
    }

    try {
      const client = this.createClient({ instanceId, token });
      const { data } = await client.post<ZApiResponse>("/send-text", { phone, message });
      if (typeof data?.ok === "boolean") return data;
      return { ok: true, data };
    } catch (err) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const payload = e.response?.data;
      console.error("Error sending text message", { status, payload, message: e.message });
      return { ok: false, error: payload?.error ?? e.message };
    }
  }

  public async sendOptionList({
    instanceId,
    token,
    phone,
    message,
    options,
  }: SendOptionListInput): Promise<ZApiResponse> {
    if (!instanceId || !token) {
      return { ok: false, error: "Instance ID and token are required" };
    }

    try {
      const client = this.createClient({ instanceId, token });
      const { data } = await client.post<ZApiResponse>("/send-option-list", {
        phone,
        message,
        options,
      });
      if (typeof data?.ok === "boolean") return data;
      return { ok: true, data };
    } catch (err) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const payload = e.response?.data;
      console.error("Error sending option list message", { status, payload, message: e.message });
      return { ok: false, error: payload?.error ?? e.message };
    }
  }
}

export default new ZApiService();
