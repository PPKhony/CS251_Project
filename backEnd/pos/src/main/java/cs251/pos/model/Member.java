package cs251.pos.model;

import java.sql.Date;
import java.sql.Timestamp;

public class Member {
    private String m_id;
    private String m_password;
    private String m_rank;
    private String m_citizenId;
    private String m_name;
    private int m_points;
    private Timestamp m_enroll;
    private Date m_birthdate;

    public Member(){}

    public Member(String m_password, String m_rank, String m_citizenId, String m_name, int m_points, Timestamp m_enroll, Date m_birthdate) {
        this.m_password = m_password;
        this.m_rank = m_rank;
        this.m_citizenId = m_citizenId;
        this.m_name = m_name;
        this.m_points = m_points;
        this.m_enroll = m_enroll;
        this.m_birthdate = m_birthdate;
    }

    public Member(String m_id, String m_password, String m_rank, String m_citizenId, String m_name, int m_points, Timestamp m_enroll, Date m_birthdate) {
        this.m_id = m_id;
        this.m_password = m_password;
        this.m_rank = m_rank;
        this.m_citizenId = m_citizenId;
        this.m_name = m_name;
        this.m_points = m_points;
        this.m_enroll = m_enroll;
        this.m_birthdate = m_birthdate;
    }

    public String getM_id() {
        return m_id;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }

    public String getM_password() {
        return m_password;
    }

    public void setM_password(String m_password) {
        this.m_password = m_password;
    }

    public String getM_rank() {
        return m_rank;
    }

    public void setM_rank(String m_rank) {
        this.m_rank = m_rank;
    }

    public String getM_citizenId() {
        return m_citizenId;
    }

    public void setM_citizenId(String m_citizenId) {
        this.m_citizenId = m_citizenId;
    }

    public String getM_name() {
        return m_name;
    }

    public void setM_name(String m_name) {
        this.m_name = m_name;
    }

    public int getM_points() {
        return m_points;
    }

    public void setM_points(int m_points) {
        this.m_points = m_points;
    }

    public Timestamp getM_enroll() {
        return m_enroll;
    }

    public void setM_enroll(Timestamp m_enroll) {
        this.m_enroll = m_enroll;
    }

    public Date getM_birthdate() {
        return m_birthdate;
    }

    public void setM_birthdate(Date m_birthdate) {
        this.m_birthdate = m_birthdate;
    }
}
