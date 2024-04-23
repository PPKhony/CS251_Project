package cs251.pos.model;

public class    MenuHavePromotion {
    private String foodname;
    private String Promotion_Code;
    private int Amount;
    public MenuHavePromotion(){}

    public MenuHavePromotion(String foodname, String promotion_Code, int amount) {
        this.foodname = foodname;
        Promotion_Code = promotion_Code;
        Amount = amount;
    }

    public String getFoodname() {
        return foodname;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public String getPromotion_Code() {
        return Promotion_Code;
    }

    public void setPromotion_Code(String promotion_Code) {
        Promotion_Code = promotion_Code;
    }

    public int getAmount() {
        return Amount;
    }

    public void setAmount(int amount) {
        Amount = amount;
    }
}
