package cs251.pos.model;

public class InvoiceHaveMember {
    private int InvoiceNo;
    private String m_id;

    public InvoiceHaveMember(int invoiceNo, String m_id) {
        InvoiceNo = invoiceNo;
        this.m_id = m_id;
    }

    public int getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public String getM_id() {
        return m_id;
    }

    public void setM_id(String m_id) {
        this.m_id = m_id;
    }
}
