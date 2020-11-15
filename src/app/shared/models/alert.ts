type AlertType = 'success' | 'error' | 'inform';

export interface Alert {
  type: AlertType;
  message: string;
  durationMs?: number;
  closable?: boolean;
}
