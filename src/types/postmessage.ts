export type PostMessageType =
  | "TIENDRI_CSS_VAR_UPDATE"
  | "TIENDRI_RELOAD_REQUEST";

export interface CssVarUpdatePayload {
  vars: Record<string, string>;
}

export interface ReloadRequestPayload {
  reason?: string;
}

export interface TiendriPostMessage {
  type: PostMessageType;
  payload: CssVarUpdatePayload | ReloadRequestPayload;
}
