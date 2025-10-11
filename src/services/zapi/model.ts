export interface ZApiClientOptions {
  instanceId?: string;
  token?: string;
}

export interface OptionRow {
  id: string;
  title: string;
  description?: string;
}

export interface OptionList {
  title: string;
  rows: OptionRow[];
}

export interface SendTextInput {
  instanceId: string | null;
  token: string | null;
  phone: string;
  message: string;
}

export interface SendOptionListInput {
  instanceId: string | null;
  token: string | null;
  phone: string;
  message: string;
  options: OptionList[];
}

export interface ZApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}
