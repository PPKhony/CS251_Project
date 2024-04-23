package cs251.pos.model;

public class OrderPromotion {
    private int InvoiceNo;
    private String Promotion_Code;
    private int p_amount;
    public OrderPromotion() {}

    public OrderPromotion(int invoiceNo, String promotion_Code, int p_amount) {
        InvoiceNo = invoiceNo;
        Promotion_Code = promotion_Code;
        this.p_amount = p_amount;
    }

    public int getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public String getPromotion_Code() {
        return Promotion_Code;
    }

    public void setPromotion_Code(String promotion_Code) {
        Promotion_Code = promotion_Code;
    }

    public int getP_amount() {
        return p_amount;
    }

    public void setP_amount(int p_amount) {
        this.p_amount = p_amount;
    }
}
