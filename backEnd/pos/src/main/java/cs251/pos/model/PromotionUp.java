package cs251.pos.model;

import java.sql.Timestamp;

public class PromotionUp {
    private String Promotion_Name;
    private double Promotion_Price;
    private String Promotion_Code;
    private Timestamp Promotion_Expire;

    public PromotionUp(){}

    public PromotionUp(String promotion_Name, double promotion_Price, String promotion_Code, Timestamp promotion_Expire) {
        Promotion_Name = promotion_Name;
        Promotion_Price = promotion_Price;
        Promotion_Code = promotion_Code;
        Promotion_Expire = promotion_Expire;
    }

    public String getPromotion_Name() {
        return Promotion_Name;
    }

    public void setPromotion_Name(String promotion_Name) {
        Promotion_Name = promotion_Name;
    }

    public double getPromotion_Price() {
        return Promotion_Price;
    }

    public void setPromotion_Price(double promotion_Price) {
        Promotion_Price = promotion_Price;
    }

    public String getPromotion_Code() {
        return Promotion_Code;
    }

    public void setPromotion_Code(String promotion_Code) {
        Promotion_Code = promotion_Code;
    }

    public Timestamp getPromotion_Expire() {
        return Promotion_Expire;
    }

    public void setPromotion_Expire(Timestamp promotion_Expire) {
        Promotion_Expire = promotion_Expire;
    }
}
