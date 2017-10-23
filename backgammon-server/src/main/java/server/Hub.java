package server;

import javax.websocket.Session;

class Hub {
    public int getIter() {
        return iter;
    }


    private int iter = 0;
    private MySession[] sessions = new MySession[2];

    public boolean setSession(MySession session){
        boolean result = false;
        if(iter<2){
            sessions[iter] = session;
            iter++;
            result = true;
        }
        return result;
    }

    public MySession getSecondSessions(int iter) {
        MySession mySession = null;
        if(iter == 0){
            mySession = sessions[1];
        }if(iter == 1){
            mySession = sessions[2];
        }
        return mySession;
    }
}
