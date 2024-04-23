package cs251.pos.model;

public class Seller_tel {
    private String s_workid;
    private String s_tel;

    public Seller_tel() {}
    public Seller_tel(String s_workid, String s_tel) {
        this.s_workid = s_workid;
        this.s_tel = s_tel;
    }

    public String getS_workid() {
        return s_workid;
    }

    public void setS_workid(String s_workid) {
        this.s_workid = s_workid;
    }

    public String getS_tel() {
        return s_tel;
    }

    public void setS_tel(String s_tel) {
        this.s_tel = s_tel;
    }
}
