package cs251.pos.model;

public class OrderMenu {
    private int InvoiceNo;
    private String foodname;
    private int m_amount;

    public OrderMenu(int invoiceNo, String foodname, int m_amount) {
        InvoiceNo = invoiceNo;
        this.foodname = foodname;
        this.m_amount = m_amount;
    }

    public int getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public String getFoodname() {
        return foodname;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public int getM_amount() {
        return m_amount;
    }

    public void setM_amount(int m_amount) {
        this.m_amount = m_amount;
    }
}
