package cs251.pos.model;
import java.sql.Date;
import java.sql.Time;

public class Checkin {
    private String s_workid;
    private Date Date;
    private Time TimeIn;
    private Time TimeOut;

    public Checkin() {}

    public Checkin(String s_workid) {
        this.s_workid = s_workid;
    }

    public Checkin(String s_workid, java.sql.Date date, Time timeIn) {
        this.s_workid = s_workid;
        Date = date;
        TimeIn = timeIn;
    }

    public Checkin(String s_workid, java.sql.Date date, Time timeIn, Time timeOut) {
        this.s_workid = s_workid;
        Date = date;
        TimeIn = timeIn;
        TimeOut = timeOut;
    }

    public String getS_workid() {
        return s_workid;
    }

    public void setS_workid(String s_workid) {
        this.s_workid = s_workid;
    }

    public java.sql.Date getDate() {
        return Date;
    }

    public void setDate(java.sql.Date date) {
        Date = date;
    }

    public Time getTimeIn() {
        return TimeIn;
    }

    public void setTimeIn(Time timeIn) {
        TimeIn = timeIn;
    }

    public Time getTimeOut() {
        return TimeOut;
    }

    public void setTimeOut(Time timeOut) {
        TimeOut = timeOut;
    }
}
