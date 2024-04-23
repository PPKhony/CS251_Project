package cs251.pos.model;

public class Book {
    private String bid;
    private String bname;
    private String author;
    private String category;
    private String status;
    private String description;
    private double overall_rating;
    private String pic;
    private int count = 0;

    public Book() {}

    public Book(String bid, String bname, String author, String category, String status, String description, double overall_rating, String pic) {
        this.bid = bid;
        this.bname = bname;
        this.author = author;
        this.category = category;
        this.status = status;
        this.description = description;
        this.overall_rating = overall_rating;
        this.pic = pic;
    }

    public Book(String bid, String bname, String author, String category, String status, String description, double overall_rating, String pic, int count) {
        this.bid = bid;
        this.bname = bname;
        this.author = author;
        this.category = category;
        this.status = status;
        this.description = description;
        this.overall_rating = overall_rating;
        this.pic = pic;
        this.count = count;
    }

    public String getBid() {
        return bid;
    }

    public void setBid(String bid) {
        this.bid = bid;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getOverall_rating() {
        return overall_rating;
    }

    public void setOverall_rating(double overall_rating) {
        this.overall_rating = overall_rating;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
