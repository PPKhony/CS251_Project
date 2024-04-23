package cs251.pos.model;

public class Menu {
    private String unit;
    private String foodname;
    private int amount;
    private double price;

    public Menu(){}

    public Menu(String foodname, int amount) {
        this.foodname = foodname;
        this.amount = amount;
    }

    public Menu(String unit, String foodname, int amount, double price) {
        this.unit = unit;
        this.foodname = foodname;
        this.amount = amount;
        this.price = price;
    }

    public Menu(String unit, int amount, double price) {
        this.unit = unit;
        this.amount = amount;
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getFoodname() {
        return foodname;
    }

    public void setFoodname(String foodname) {
        this.foodname = foodname;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}


