export interface SendTextInput {
  phone: string;
  message: string;
}

export interface SendOptionListInput {
  phone: string;
  message: string;
  options: {
    title: string;
    rows: {
      id: string;
      title: string;
      description?: string;
    }[];
  }[];
}

export interface MessagingResponse {
  ok: boolean;
  data?: unknown;
  error?: string;
}

export interface IMessagingProvider {
  sendText(input: SendTextInput): Promise<MessagingResponse>;
  sendOptionList(input: SendOptionListInput): Promise<MessagingResponse>;
}