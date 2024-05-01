package cs251.pos.repository;

import cs251.pos.model.*;

import java.util.List;

public interface PosRepository {
    int insertSeller(Seller seller);
    int insertSellerTel(Seller_tel seller_tel);
    int insertMenu(Menu menu);
    int insertInvoice(Invoice invoice);
    int insertMember(Member member);
    int insertMemberTel(Member_tel member_tel);
    int insertPromotion(Promotion promotion);
    int insertMenuHavePromotion(MenuHavePromotion menuHavePromotion);
    int insertCheckin(Checkin checkin);
    int insertOrderMenu(OrderMenu ordermenu);
    int insertOrderPromotion(OrderPromotion orderPromotion);
    int updateCheckin(Checkin checkin);
    int updateMember(Member member);
    int updateMemberTel(Member_tel member_tel, String m_tel);
    int deleteMember(String m_id);
    int addMemberPoint(int point, String m_id);
    int addMenuAmount(String foodname, int amount);
    int reduceMenuAmount(String foodname, int reduce);
    int updateMenu(Menu menu);
    int updatePromotion(Promotion promotion);
    int reduceMenuInPromotion(String Promotion_Code);
    Seller findSellerByWorkId(String s_workid);

    List<Seller_tel> findSellerTelByWorkId(String s_workid);
    List<Menu> findMenuByNameContaining(String name);
    List<Menu> findAllMenu();
    Menu findMenuByName(String foodname);
    List<Invoice> getInvoice(int limit, int offset);
    List<Invoice> getInvoiceByDay(String startDate, String endDate, int limit, int offset);
    List<Menu> findAmountMenuInPromotion(String Promotion_Code);
    Member findMemberByMemberId(String m_id);
    List<Member> getAllMember();
    List<Member> findMemberByName(String name);
    List<Member_tel> findMemberTelByMemberId(String m_id);
    List<Checkin> findCheckinById(String s_workid);
    Promotion findPromotionByCode(String promotion_code);
    List<Promotion> findPromotionByNameContaining(String name);

    List<Promotion> findActivePromotion();
    List<MenuHavePromotion> findMenuHavePromotion(String Promotion_Code);
    List<PrintInvoice> printInvoice(int invoiceNo);

    int deletePromotionByCode(String Promotion_Code);
    int deleteMenuByName(String foodname);
    int deleteMenuHavePromotion(String Promotion_Code);
    int deleteTransaction(String t_id);
    Seller login(String s_workid, String password);

    int insertBook(Book book);
    Book findBookByBid(String bid);
    int calScore(String bid, int rating);


}
