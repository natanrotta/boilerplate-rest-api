import { injectable } from "tsyringe";
import axios, { AxiosInstance, AxiosError } from "axios";
import {
  IMessagingProvider,
  SendTextInput,
  SendOptionListInput,
  MessagingResponse,
} from "../../../domain/providers";
import { env } from "../../config";
import { logger } from "../../http/logger";

@injectable()
export class ZApiMessagingProvider implements IMessagingProvider {
  private createClient(): AxiosInstance | null {
    if (!env.ZAPI_INSTANCE_ID || !env.ZAPI_TOKEN) {
      return null;
    }

    const baseURL = `${env.ZAPI_BASE_URL}/${env.ZAPI_INSTANCE_ID}/token/${env.ZAPI_TOKEN}`;

    return axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...(env.ZAPI_CLIENT_TOKEN && { "Client-Token": env.ZAPI_CLIENT_TOKEN }),
      },
      timeout: 15000,
    });
  }

  private handleError(error: unknown): MessagingResponse {
    const axiosError = error as AxiosError<{ error?: string }>;

    logger.error(
      {
        status: axiosError.response?.status,
        data: axiosError.response?.data,
        message: axiosError.message,
      },
      "ZApi request failed"
    );

    return {
      ok: false,
      error: axiosError.response?.data?.error ?? axiosError.message,
    };
  }

  async sendText(input: SendTextInput): Promise<MessagingResponse> {
    const client = this.createClient();

    if (!client) {
      return { ok: false, error: "Messaging provider not configured" };
    }

    try {
      const { data } = await client.post("/send-text", {
        phone: input.phone,
        message: input.message,
      });

      return { ok: true, data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async sendOptionList(input: SendOptionListInput): Promise<MessagingResponse> {
    const client = this.createClient();

    if (!client) {
      return { ok: false, error: "Messaging provider not configured" };
    }

    try {
      const { data } = await client.post("/send-option-list", {
        phone: input.phone,
        message: input.message,
        options: input.options,
      });

      return { ok: true, data };
    } catch (error) {
      return this.handleError(error);
    }
  }
}