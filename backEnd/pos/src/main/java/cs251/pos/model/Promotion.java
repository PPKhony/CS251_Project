package cs251.pos.model;

import java.sql.Timestamp;

public class Promotion {
    private String Promotion_Name;
    private double Promotion_Price;
    private String Promotion_Code;
    private Timestamp Promotion_Expire;

    public Promotion() {}

    public Promotion(String promotion_name, double promotion_price, String promotion_code, Timestamp promotion_expire) {
        this.Promotion_Name = promotion_name;
        this.Promotion_Price = promotion_price;
        this.Promotion_Code = promotion_code;
        this.Promotion_Expire = promotion_expire;
    }

    public String getPromotion_Name() {
        return Promotion_Name;
    }

    public void setPromotion_Name(String promotion_Name) {
        this.Promotion_Name = promotion_Name;
    }

    public double getPromotion_Price() {
        return Promotion_Price;
    }

    public void setPromotion_Price(double promotion_Price) {
        this.Promotion_Price = promotion_Price;
    }

    public String getPromotion_Code() {
        return Promotion_Code;
    }

    public void setPromotion_Code(String promotion_Code) {
        this.Promotion_Code = promotion_Code;
    }

    public Timestamp getPromotion_Expire() {
        return Promotion_Expire;
    }

    public void setPromotion_Expire(Timestamp promotion_Expire) {
        this.Promotion_Expire = promotion_Expire;
    }
}
