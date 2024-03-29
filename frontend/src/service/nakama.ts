import { Client, Session } from "@heroiclabs/nakama-js";

import { API_PORT, API_URL, SERVER_KEY, USE_SSL, API_TIMEOUT } from "../constants";
import { getAuthToken, getRefreshToken, removeAuthToken, removeRefreshToken, setAuthToken, setRefreshToken } from "../util";

class NakamaService {
  client = new Client(SERVER_KEY, API_URL, API_PORT, USE_SSL, API_TIMEOUT);
  socket = this.client.createSocket(USE_SSL);

  private async joinSession(session: Session): Promise<Session> {
    const newSession = await this.socket.connect(session, true);
    return newSession;
  }

  async authenticate(username: string, password: string, newUser = false): Promise<Session> {
    const session = await this.client.authenticateCustom(password, newUser, username);
    setAuthToken(session.token);
    setRefreshToken(session.refresh_token);
    const newSession = await this.joinSession(session);
    return newSession;
  }

  async refreshSession(): Promise<Session | undefined> {
    const authToken = getAuthToken();
    const refreshToken = getRefreshToken();

    if (!authToken || !refreshToken) throw new Error("Not authenticated");

    const oldSession = Session.restore(authToken, refreshToken);

    if (oldSession && oldSession.isrefreshexpired(Date.now() / 1000)) {
      this.reset();
      return;
    }
    const session = await this.client.sessionRefresh(oldSession);

    const joinedSession = await this.joinSession(session);
    return joinedSession;
  }

  reset() {
    this.socket.disconnect(true);
    removeAuthToken();
    removeRefreshToken();
  }
}

export const nakama = new NakamaService();
