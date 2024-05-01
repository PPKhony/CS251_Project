package cs251.pos.model;

import java.sql.Timestamp;

public class Invoice {
    private int InvoiceNo;
    private double Payment;
    private String PaymentMethod;
    private Timestamp DateTime;
    private double TotalDiscount;
    private double NetPrice;
    private boolean IsTakeHome;
    private String MemberID;
    private double i_change;
    public Invoice(){}

    public Invoice(double payment, String paymentMethod, Timestamp dateTime, double totalDiscount, double netPrice, boolean isTakeHome, String memberID, double i_change) {
        Payment = payment;
        PaymentMethod = paymentMethod;
        DateTime = dateTime;
        TotalDiscount = totalDiscount;
        NetPrice = netPrice;
        IsTakeHome = isTakeHome;
        MemberID = memberID;
        this.i_change = i_change;
    }

    public Invoice(int invoiceNo, double payment, String paymentMethod, Timestamp dateTime, double totalDiscount, double netPrice, boolean isTakeHome, String memberID, double i_change) {
        InvoiceNo = invoiceNo;
        Payment = payment;
        PaymentMethod = paymentMethod;
        DateTime = dateTime;
        TotalDiscount = totalDiscount;
        NetPrice = netPrice;
        this.IsTakeHome = isTakeHome;
        MemberID = memberID;
        this.i_change = i_change;
    }

    public Invoice(double payment, String paymentMethod, Timestamp dateTime, double netPrice, double i_change) {
        Payment = payment;
        PaymentMethod = paymentMethod;
        DateTime = dateTime;
        NetPrice = netPrice;
        this.i_change = i_change;
    }

    public int getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public double getPayment() {
        return Payment;
    }

    public void setPayment(double payment) {
        Payment = payment;
    }

    public String getPaymentMethod() {
        //System.out.println("Sending Payment Method! " + PaymentMethod);
        return PaymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        PaymentMethod = paymentMethod;
    }

    public Timestamp getDateTime() {
        return DateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        DateTime = dateTime;
    }

    public double getTotalDiscount() {
        return TotalDiscount;
    }

    public void setTotalDiscount(double totalDiscount) {
        TotalDiscount = totalDiscount;
    }

    public double getNetPrice() {
        return NetPrice;
    }

    public void setNetPrice(double netPrice) {
        NetPrice = netPrice;
    }

    public boolean isTakeHome() {
        return IsTakeHome;
    }

    public void setTakeHome(boolean takeHome) {
        IsTakeHome = takeHome;
    }

    public String getMemberID() {
        return MemberID;
    }

    public void setMemberID(String memberID) {
        MemberID = memberID;
    }

    public double getI_change() {
        return i_change;
    }

    public void setI_change(double i_change) {
        this.i_change = i_change;
    }
}
