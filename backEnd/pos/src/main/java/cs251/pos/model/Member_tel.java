package cs251.pos.model;

public class Member_tel {
    private String m_id;
    private String m_tel;

    public Member_tel(){}

    public Member_tel(String m_id, String m_tel) {
        this.m_id = m_id;
        this.m_tel = m_tel;
    }

    public String getM_id() {
        return m_id;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }

    public String getM_tel() {
        return m_tel;
    }

    public void setM_tel(String m_tel) {
        this.m_tel = m_tel;
    }


}
