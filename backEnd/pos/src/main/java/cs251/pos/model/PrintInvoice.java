package cs251.pos.model;

import java.sql.Timestamp;

public class PrintInvoice {
    private int InvoiceNo;
    private String Payment;
    private String PaymentMethod;
    private Timestamp DateTime;
    private Double TotalDiscount;
    private Double NetPrice;
    private boolean isTakeHome;
    private String MemberID;
    private Double i_change;
    private String OrderedFood;
    private int OrderedAmount;
    private String PromotionCode;
    private int PromotionAmount;

    public PrintInvoice() {}

    public PrintInvoice(String payment, String paymentMethod, Timestamp dateTime, Double totalDiscount, Double netPrice, boolean isTakeHome, String memberID, Double i_change, String orderedFood, int orderedAmount, String promotionCode, int promotionAmount) {
        Payment = payment;
        PaymentMethod = paymentMethod;
        DateTime = dateTime;
        TotalDiscount = totalDiscount;
        NetPrice = netPrice;
        this.isTakeHome = isTakeHome;
        MemberID = memberID;
        this.i_change = i_change;
        OrderedFood = orderedFood;
        OrderedAmount = orderedAmount;
        PromotionCode = promotionCode;
        PromotionAmount = promotionAmount;
    }

    public PrintInvoice(int invoiceNo, String payment, String paymentMethod, Timestamp dateTime, Double totalDiscount, Double netPrice, boolean isTakeHome, String memberID, Double i_change, String orderedFood, int orderedAmount, String promotionCode, int promotionAmount) {
        InvoiceNo = invoiceNo;
        Payment = payment;
        PaymentMethod = paymentMethod;
        DateTime = dateTime;
        TotalDiscount = totalDiscount;
        NetPrice = netPrice;
        this.isTakeHome = isTakeHome;
        MemberID = memberID;
        this.i_change = i_change;
        OrderedFood = orderedFood;
        OrderedAmount = orderedAmount;
        PromotionCode = promotionCode;
        PromotionAmount = promotionAmount;
    }

    public int getInvoiceNo() {
        return InvoiceNo;
    }

    public void setInvoiceNo(int invoiceNo) {
        InvoiceNo = invoiceNo;
    }

    public String getPayment() {
        return Payment;
    }

    public void setPayment(String payment) {
        Payment = payment;
    }

    public String getPaymentMethod() {
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

    public Double getTotalDiscount() {
        return TotalDiscount;
    }

    public void setTotalDiscount(Double totalDiscount) {
        TotalDiscount = totalDiscount;
    }

    public Double getNetPrice() {
        return NetPrice;
    }

    public void setNetPrice(Double netPrice) {
        NetPrice = netPrice;
    }

    public boolean isTakeHome() {
        return isTakeHome;
    }

    public void setTakeHome(boolean takeHome) {
        isTakeHome = takeHome;
    }

    public String getMemberID() {
        return MemberID;
    }

    public void setMemberID(String memberID) {
        MemberID = memberID;
    }

    public Double getI_change() {
        return i_change;
    }

    public void setI_change(Double i_change) {
        this.i_change = i_change;
    }

    public String getOrderedFood() {
        return OrderedFood;
    }

    public void setOrderedFood(String orderedFood) {
        OrderedFood = orderedFood;
    }

    public int getOrderedAmount() {
        return OrderedAmount;
    }

    public void setOrderedAmount(int orderedAmount) {
        OrderedAmount = orderedAmount;
    }

    public String getPromotionCode() {
        return PromotionCode;
    }

    public void setPromotionCode(String promotionCode) {
        PromotionCode = promotionCode;
    }

    public int getPromotionAmount() {
        return PromotionAmount;
    }

    public void setPromotionAmount(int promotionAmount) {
        PromotionAmount = promotionAmount;
    }
    public void setPromotionAmount(String promotionAmount){
        PromotionAmount = 0;
    }
}
