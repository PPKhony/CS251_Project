package cs251.pos.repository;

import cs251.pos.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.data.relational.core.sql.In;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public class JdbcPosRepository implements PosRepository{
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Override
        public int insertSeller(Seller seller) {
            return jdbcTemplate.update("INSERT INTO Seller (s_workid, s_name, s_password, s_citizenID, " +
                    "s_address, s_startDate) VALUES (?,?,?,?,?,?)",
                    new Object[] {seller.getS_workid(), seller.getS_name(), seller.getS_password(), seller.getS_citizenID(),
                    seller.getS_address(), seller.getS_startDate()});
        }

    @Override
    public int insertSellerTel(Seller_tel seller_tel) {
        return jdbcTemplate.update("INSERT INTO Seller_tel (s_workid, s_tel) VALUES (?,?)",
                new Object[] {seller_tel.getS_workid(), seller_tel.getS_tel()});
    }

    @Override
    public int insertMenu(Menu menu) {
        return jdbcTemplate.update("INSERT INTO Menu (unit, foodname, amount, price) VALUES (?,?,?,?)",
                new Object[]{menu.getUnit(), menu.getFoodname(), menu.getAmount(), menu.getPrice()});
    }

    @Override
    public int insertInvoice(Invoice invoice) {
//        System.out.println(invoice.isTakeHome());
//        System.out.println(((invoice.isTakeHome()) ? 1:0));
        return jdbcTemplate.update("INSERT INTO Invoice (Payment, PaymentMethod, DateTime, TotalDiscount, NetPrice, " +
                "IsTakeHome, MemberID, i_change) VALUES (?,?,?,?,?,?,?,?)",
                new Object[] {invoice.getPayment(), invoice.getPaymentMethod(), invoice.getDateTime(), invoice.getTotalDiscount(),
                invoice.getNetPrice(), ((invoice.isTakeHome()) ? 1:0), invoice.getMemberID(), invoice.getI_change()});
    }

    @Override
    public int insertMember(Member member) {
        return jdbcTemplate.update("INSERT INTO Member (m_id, m_password, m_rank, m_citizenId, m_name, m_points, m_enroll, m_birthdate) " +
                "VALUES (?,?,?,?,?,?,?,?)",
                new Object[] {member.getM_id(), member.getM_password(), member.getM_rank(), member.getM_citizenId(), member.getM_name(), member.getM_points(),
                member.getM_enroll(), member.getM_birthdate()});
    }

    @Override
    public int insertMemberTel(Member_tel member_tel) {
        return jdbcTemplate.update("INSERT INTO Member_tel (m_id, m_tel) VALUES (?,?)",
                new Object[] {member_tel.getM_id(), member_tel.getM_tel()});
    }

    @Override
    public int insertPromotion(Promotion promotion) {
        return jdbcTemplate.update("INSERT INTO Promotion (Promotion_Name, Promotion_Price, Promotion_Code, Promotion_Expire) " +
                "VALUES (?,?,?,?)",
                new Object[]{promotion.getPromotion_Name(), promotion.getPromotion_Price(), promotion.getPromotion_Code(), promotion.getPromotion_Expire()});
    }

    @Override
    public int insertMenuHavePromotion(MenuHavePromotion menuHavePromotion) {
        return jdbcTemplate.update("INSERT INTO MenuHavePromotion (foodname, Promotion_Code, Amount) VALUES (?,?,?)",
                new Object[]{menuHavePromotion.getFoodname(), menuHavePromotion.getPromotion_Code(), menuHavePromotion.getAmount()});
    }

    @Override
    public int insertCheckin(Checkin checkin) {
        return jdbcTemplate.update("INSERT INTO Checkin (s_workid, Date, TimeIn) VALUES (?, CURRENT_DATE(), CURRENT_TIME() )",
                new Object[]{checkin.getS_workid()});
    }

    @Override
    public int insertOrderMenu(OrderMenu ordermenu) {
        return jdbcTemplate.update("INSERT INTO OrderMenu (InvoiceNo, foodname, m_amount) VALUES (?,?,?)",
                new Object[]{ordermenu.getInvoiceNo(), ordermenu.getFoodname(), ordermenu.getM_amount()});
    }

    @Override
    public int insertOrderPromotion(OrderPromotion orderPromotion) {
        return jdbcTemplate.update("INSERT INTO OrderPromotion (InvoiceNo, Promotion_Code, p_amount) VALUES (?,?,?)",
                new Object[]{orderPromotion.getInvoiceNo(), orderPromotion.getPromotion_Code(), orderPromotion.getP_amount()});
    }

    @Override
    public int updateCheckin(Checkin checkin) {
        /*return jdbcTemplate.update("UPDATE Checkin SET TimeOut = CURRENT_TIME() WHERE s_workid =? AND Date = CUREENT_DATE()",
                new Object[]{checkin.getS_workid()});*/
        String q = "UPDATE Checkin SET TimeOut = CURRENT_TIME() WHERE s_workid='" + checkin.getS_workid() + "' AND Date = CURRENT_DATE()";
        return jdbcTemplate.update(q);
    }

    @Override
    public int updateMemberTel(Member_tel member_tel, String m_tel) {
        /*return jdbcTemplate.update("UPDATE Member_tel SET m_tel=? WHERE m_id=? AND m_tel=?",
                new Object[]{member_tel.getM_tel(), member_tel.getM_tel()}, m_tel);*/
        String q = "UPDATE Member_tel SET m_tel='" + member_tel.getM_tel() + "' WHERE m_id='" + member_tel.getM_id() +"' " +
                "AND m_tel='" + m_tel + "'";
        return jdbcTemplate.update(q);
    }

    @Override
    public int updateMember(Member member) {
        return jdbcTemplate.update("UPDATE Member SET m_password=?, m_rank=?, m_citizenId=?, m_name=?, m_points=?, m_enroll=?, m_birthdate=? " +
                        "WHERE m_id=?",
                new Object[]{member.getM_password(), member.getM_rank(), member.getM_citizenId(), member.getM_name(), member.getM_points(),
                member.getM_enroll(), member.getM_birthdate(), member.getM_id()});
    }
    @Override
    public List<Member> getAllMember(){
        try {
            List<Member> members = jdbcTemplate.query("SELECT * FROM Member",
                    BeanPropertyRowMapper.newInstance(Member.class));
            return members;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null; // จัดการและคืนค่า null หากพบข้อมูลมากกว่าหนึ่งแถว
        }

    }

    @Override
    public int deleteMember(String m_id) {
            return (jdbcTemplate.update("DELETE FROM Member_tel WHERE m_id = ?",m_id)*jdbcTemplate.update("DELETE FROM Member WHERE m_id =?", m_id));
    }

    @Override
    public int addMemberPoint(int point, String m_id) {
        String q = "UPDATE Member SET m_points = m_points + " + Integer.toString(point) + " WHERE m_id =" + m_id;
        return jdbcTemplate.update(q);

    }

    @Override
    public int addMenuAmount(String foodname, int amount) {
        String q = "UPDATE Menu SET amount = amount + " + Integer.toString(amount) + " WHERE foodname ='" + foodname + "'";
        return jdbcTemplate.update(q);
    }

    @Override
    public int reduceMenuAmount(String foodname, int reduce) {
        String q = "UPDATE Menu SET amount = amount - " + Integer.toString(reduce) + " WHERE foodname ='" + foodname + "'";
        return jdbcTemplate.update(q);
    }

    @Override
    public int updateMenu(Menu menu) {
        return jdbcTemplate.update("UPDATE Menu SET unit=?, amount=?, price=? WHERE foodname=?",
                new Object[]{menu.getUnit(), menu.getAmount(), menu.getPrice(), menu.getFoodname()});
    }

    @Override
    public int updatePromotion(Promotion promotion) {
        return jdbcTemplate.update("UPDATE Promotion SET Promotion_Name=?, Promotion_Price=?, Promotion_Expire=? WHERE Promotion_Code=?",
                new Object[]{promotion.getPromotion_Name(), promotion.getPromotion_Price(), promotion.getPromotion_Expire(), promotion.getPromotion_Code()});
    }

    @Override
    public int reduceMenuInPromotion(String Promotion_Code) {
        String q = "UPDATE Menu M\n" +
                "INNER JOIN (\n" +
                "    SELECT MHP.foodname, SUM(OP.p_amount * MHP.Amount) AS total_decrease\n" +
                "    FROM OrderPromotion OP\n" +
                "    INNER JOIN MenuHavePromotion MHP ON OP.Promotion_Code = MHP.Promotion_Code\n" +
                "    INNER JOIN Menu MP ON MHP.foodname = MP.foodname\n" +
                "    WHERE OP.Promotion_Code ='" + Promotion_Code + "'" +
                "    GROUP BY MP.foodname\n" +
                ") AS PromotionAmount ON M.foodname = PromotionAmount.foodname\n" +
                "SET M.amount = M.amount - PromotionAmount.total_decrease;";
        return jdbcTemplate.update(q);
    }

    @Override
    public Seller findSellerByWorkId(String s_workid) {
        try {
            Seller seller = jdbcTemplate.queryForObject("SELECT * FROM Seller WHERE s_workid=?",
                    BeanPropertyRowMapper.newInstance(Seller.class), s_workid);
            return seller;
        }catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Seller_tel> findSellerTelByWorkId(String s_workid) {
        try {
            List<Seller_tel> seller_tels = jdbcTemplate.query("SELECT * FROM Seller_tel WHERE s_workid=?",
                    BeanPropertyRowMapper.newInstance(Seller_tel.class), s_workid);

            return seller_tels; // คืนค่า List ของ Seller_tel
        } catch (IncorrectResultSizeDataAccessException e) {
            return null; // จัดการและคืนค่า null หากพบข้อมูลมากกว่าหนึ่งแถว
        }
    }

    @Override
    public List<Menu> findMenuByNameContaining(String name) {
        String q = "SELECT * FROM Menu WHERE foodname LIKE '%" + name + "%'";
        return jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Menu.class));
    }

    @Override
    public List<Menu> findAllMenu() {
        return jdbcTemplate.query("SELECT * FROM Menu", BeanPropertyRowMapper.newInstance(Menu.class));
    }

    @Override
    public Menu findMenuByName(String foodname) {
        try {
            Menu menu = jdbcTemplate.queryForObject("SELECT * FROM Menu WHERE foodname=?",
                    BeanPropertyRowMapper.newInstance(Menu.class), foodname);
            return menu;
        }catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }


    @Override
    public List<Invoice> getInvoice(int limit, int offset) {
        String q = "SELECT *, IF(IsTakeHome = 1, TRUE, FALSE) AS IsTakeHomeBool FROM Invoice ORDER BY InvoiceNo DESC LIMIT ? OFFSET ?";
        return jdbcTemplate.query(q, new Object[]{limit, offset}, (rs, rowNum) -> {
            Invoice invoice = new Invoice();
            invoice.setInvoiceNo(rs.getInt("InvoiceNo"));
            invoice.setPayment(rs.getDouble("Payment"));
            invoice.setPaymentMethod(rs.getString("PaymentMethod"));
            invoice.setDateTime(rs.getTimestamp("DateTime"));
            invoice.setTotalDiscount(rs.getDouble("TotalDiscount"));
            invoice.setNetPrice(rs.getDouble("NetPrice"));
            invoice.setTakeHome(rs.getBoolean("IsTakeHomeBool"));
            invoice.setMemberID(rs.getString("MemberID"));
            invoice.setI_change(rs.getDouble("i_change"));
            return invoice;
        });
    }
// @Override
//    public List<Invoice> getInvoice(int limit, int offset) {
//        String q = "SELECT *, CASE WHEN IsTakeHome = 1 THEN TRUE ELSE FALSE END AS boolIsTakeHome FROM Invoice ORDER BY InvoiceNo DESC LIMIT " + Integer.toString(limit) + " OFFSET " + Integer.toString(offset);
//
//        return jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Invoice.class));
//    }

    @Override
    public List<Invoice> getInvoiceByDay(String startDate, String endDate, int limit, int offset) {
        String q = "SELECT * FROM Invoice WHERE DateTime BETWEEN '" + startDate + "' AND '" + endDate + "'" + "ORDER BY DateTIme DESC " +
                "LIMIT " + Integer.toString(limit) + " OFFSET " + Integer.toString(offset);
        return jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Invoice.class));
    }

    @Override
    public List<Menu> findAmountMenuInPromotion(String Promotion_Code) {
        try {
            List<Menu> menus = jdbcTemplate.query("SELECT Menu.foodname, Menu.amount\n" +
                    "FROM Menu\n" +
                    "JOIN MenuHavePromotion ON Menu.foodname = MenuHavePromotion.foodname\n" +
                    "WHERE MenuHavePromotion.Promotion_Code=?", BeanPropertyRowMapper.newInstance(Menu.class), Promotion_Code);
            return menus;
        }catch (IncorrectResultSizeDataAccessException e){
            return null;
        }
    }

    @Override
    public Member findMemberByMemberId(String m_id) {
        try {
            Member member = jdbcTemplate.queryForObject("SELECT * FROM Member WHERE m_id=?",
                    BeanPropertyRowMapper.newInstance(Member.class), m_id);
            return member;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Member> findMemberByName(String name) {
        try {
            String q = "SELECT * FROM Member WHERE LOWER(m_name) = LOWER('" + name + "')";
            List<Member> members = jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Member.class));
            return members;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }


    }

    @Override
    public List<Member_tel> findMemberTelByMemberId(String m_id) {
        try {
            List<Member_tel> member_tels = jdbcTemplate.query("SELECT * FROM Member_tel WHERE m_id=?",
                    BeanPropertyRowMapper.newInstance(Member_tel.class), m_id);

            return member_tels; // คืนค่า List ของ
            
        } catch (IncorrectResultSizeDataAccessException e) {
            return null; // จัดการและคืนค่า null หากพบข้อมูลมากกว่าหนึ่งแถว
        }
    }

    @Override
    public List<Checkin> findCheckinById(String s_workid) {
        try {
            List<Checkin> checkins = jdbcTemplate.query("SELECT * FROM Checkin WHERE s_workid=?",
                    BeanPropertyRowMapper.newInstance(Checkin.class), s_workid);
            return checkins;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public Promotion findPromotionByCode(String promotion_code) {
        try {
            Promotion promotion = jdbcTemplate.queryForObject("SELECT * FROM Promotion WHERE Promotion_Code=?",
                    BeanPropertyRowMapper.newInstance(Promotion.class), promotion_code);
            return promotion;
        } catch (IncorrectResultSizeDataAccessException e){
            return null;
        }
    }

    @Override
    public List<Promotion> findPromotionByNameContaining(String name) {
        try {
            String q = "SELECT * FROM Promotion WHERE LOWER(Promotion_Name) LIKE '%" + name + "%'";
            List<Promotion> promotions = jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(Promotion.class));
            return promotions;
        }catch (IncorrectResultSizeDataAccessException e){
            return null;
        }
    }
    @Override
    public List<Promotion> findActivePromotion() {
        try {
            List<Promotion> promotions = jdbcTemplate.query("SELECT * FROM Promotion WHERE Promotion_Expire > CURRENT_TIMESTAMP()",
                    BeanPropertyRowMapper.newInstance(Promotion.class));

            return promotions; // คืนค่า List ของ

        } catch (IncorrectResultSizeDataAccessException e) {
            return null; // จัดการและคืนค่า null หากพบข้อมูลมากกว่าหนึ่งแถว
        }
    }

    @Override
    public List<MenuHavePromotion> findMenuHavePromotion(String Promotion_Code) {
        try {
            String q = "SELECT * FROM MenuHavePromotion WHERE Promotion_Code='" + Promotion_Code + "'";
            List<MenuHavePromotion> menuHavePromotions = jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(MenuHavePromotion.class));
            return menuHavePromotions;
        }catch (IncorrectResultSizeDataAccessException e){
            return null;
        }
    }

    @Override
    public List<PrintInvoice> printInvoice(int invoiceNo) {
        try {
            String q = "SELECT " +
                    "Invoice.InvoiceNo, " +
                    "Invoice.DateTime, " +
                    "Invoice.Payment, " +
                    "Invoice.PaymentMethod, " +
                    "Invoice.TotalDiscount, " +
                    "Invoice.NetPrice, " +
                    "Invoice.IsTakeHome, " +
                    "Invoice.MemberID, " +
                    "Invoice.i_change, " +
                    "OrderMenu.foodname AS OrderedFood, " +
                    "IFNULL(OrderMenu.m_amount,0) AS OrderedAmount, " +
                    "NULL AS PromotionCode, " +
                    "0 AS PromotionAmount " +
                    "FROM " +
                    "Invoice " +
                    "LEFT JOIN " +
                    "OrderMenu ON Invoice.InvoiceNo = OrderMenu.InvoiceNo " +
                    "WHERE " +
                    "Invoice.InvoiceNo = " +  + invoiceNo + " "+
                    "UNION ALL " +
                    "SELECT " +
                    "Invoice.InvoiceNo, " +
                    "Invoice.DateTime, " +
                    "Invoice.Payment, " +
                    "Invoice.PaymentMethod, " +
                    "Invoice.TotalDiscount, " +
                    "Invoice.NetPrice, " +
                    "Invoice.IsTakeHome, " +
                    "Invoice.MemberID, " +
                    "Invoice.i_change, " +
                    "NULL AS OrderedFood, " +
                    "0 AS OrderedAmount, " +
                    "OrderPromotion.Promotion_Code AS PromotionCode, " +
                    "IFNULL(OrderPromotion.p_amount, 0)AS PromotionAmount " +
                    "FROM " +
                    "Invoice " +
                    "LEFT JOIN " +
                    "OrderPromotion ON Invoice.InvoiceNo = OrderPromotion.InvoiceNo " +
                    "WHERE " +
                    "Invoice.InvoiceNo = "+ invoiceNo + " ";
            List<PrintInvoice> printInvoices = jdbcTemplate.query(q, BeanPropertyRowMapper.newInstance(PrintInvoice.class));
            return printInvoices;
        }catch (IncorrectResultSizeDataAccessException e){
            return null;
        }
    }
    @Override
    public int deleteTransaction(String t_id){
        return (jdbcTemplate.update("DELETE FROM OrderPromotion WHERE InvoiceNo = ?",t_id)*jdbcTemplate.update("DELETE FROM OrderMenu WHERE InvoiceNo = ?",t_id)*jdbcTemplate.update("DELETE FROM Invoice WHERE InvoiceNo = ?",t_id));
    }
    @Override
    public int deletePromotionByCode(String Promotion_Code) {
        return jdbcTemplate.update("DELETE FROM Promotion WHERE Promotion_Code =?", Promotion_Code);
    }

    @Override
    public int deleteMenuByName(String foodname) {
        return jdbcTemplate.update("DELETE FROM Menu WHERE foodname =?", foodname);
    }

    @Override
    public int deleteMenuHavePromotion(String Promotion_Code) {
        return jdbcTemplate.update("DELETE FROM MenuHavePromotion WHERE Promotion_Code =?", Promotion_Code);
    }

    @Override
    public Seller login(String s_workid, String password) {
        try {
            Seller seller = jdbcTemplate.queryForObject("SELECT * FROM Seller WHERE s_workid=? AND s_password=?",
                    BeanPropertyRowMapper.newInstance(Seller.class), s_workid, password);
            return seller;
        }catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public int insertBook(Book book) {
        return jdbcTemplate.update("INSERT INTO Book (bid, bname, author, category, status, description, overall_rating, pic, count) " +
                "VALUES (?,?,?,?,?,?,?,?,?)",
                new Object[]{book.getBid(), book.getBname(), book.getAuthor(), book.getCategory(), book.getStatus(), book.getDescription(),
                book.getOverall_rating(), book.getPic(), book.getCount()});
    }

    @Override
    public Book findBookByBid(String bid) {
        try {
            Book book = jdbcTemplate.queryForObject("SELECT * FROM Book WHERE bid=?",
                    BeanPropertyRowMapper.newInstance(Book.class), bid);
            return book;
        } catch (IncorrectResultSizeDataAccessException e) {
            return null;
        }
    }

    @Override
    public int calScore(String bid, int rating) {
        String q = "UPDATE Book SET overall_rating = (overall_rating + ?) / (count) WHERE bid = ?";
        return jdbcTemplate.update(q, rating, bid);
    }

}
