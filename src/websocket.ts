import { Store } from 'vuex';
import { PARSE_LOG, LogParseActionPayload, RootState } from '@/interface';

const WEBSOCKET_PROTOCOL = location.protocol === 'https:' ? 'wss:' : 'ws:';
export default class WebSocketHub {
  constructor(private store: Store<RootState>) {

  }
  public start() {
    const ws = new WebSocket(`${WEBSOCKET_PROTOCOL}//${location.host}/ws`);
    ws.addEventListener('message', (event) => {
      this.onlog(event.data);
    });
    ws.addEventListener('close', (event) => {
      setTimeout(this.start(), 5000);
    });
  }
  private onlog(data: string) {
    console.log(data);
    const payload: LogParseActionPayload = { data };
    this.store.dispatch(PARSE_LOG, payload);
  }
};
