package cs251.pos.model;
import java.sql.Timestamp;

public class Seller {
    private String s_workid;
    private String s_name;
    private String s_password;
    private String s_citizenID;
    private String s_address;
    private Timestamp s_startDate;

    public Seller() {

    }
    public Seller(String s_workid, String s_name, String s_password, String s_citizenID, String s_address, Timestamp s_startDate) {
        this.s_workid = s_workid;
        this.s_name = s_name;
        this.s_password = s_password;
        this.s_citizenID = s_citizenID;
        this.s_address = s_address;
        this.s_startDate = s_startDate;
    }

    public String getS_workid() {
        return s_workid;
    }

    public void setS_workid(String s_workid) {
        this.s_workid = s_workid;
    }

    public String getS_name() {
        return s_name;
    }

    public void setS_name(String s_name) {
        this.s_name = s_name;
    }

    public String getS_password() {
        return s_password;
    }

    public void setS_password(String s_password) {
        this.s_password = s_password;
    }

    public String getS_citizenID() {
        return s_citizenID;
    }

    public void setS_citizenID(String s_citizenID) {
        this.s_citizenID = s_citizenID;
    }

    public String getS_address() {
        return s_address;
    }

    public void setS_address(String s_address) {
        this.s_address = s_address;
    }

    public Timestamp getS_startDate() {
        return s_startDate;
    }

    public void setS_startDate(Timestamp s_startDate) {
        this.s_startDate = s_startDate;
    }
}
