package cs251.pos.controller;

import cs251.pos.model.*;
import cs251.pos.repository.PosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class PosController {
    @Autowired
    PosRepository posRepository;

    //Seller

    @PostMapping(value = "/add/seller")
    public ResponseEntity<String> createSeller(@RequestBody Seller seller) {
        try {
            posRepository.insertSeller(new Seller(seller.getS_workid(), seller.getS_name(),seller.getS_password(), seller.getS_citizenID(),
            seller.getS_address(), seller.getS_startDate() ));
            return new ResponseEntity<>("create seller was successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/seller/tel")
    public ResponseEntity<String> insertSellerTel(@RequestBody Seller_tel seller_tel) {
        try {
            posRepository.insertSellerTel(new Seller_tel(seller_tel.getS_workid(), seller_tel.getS_tel() ));
            return new ResponseEntity<>("Insert seller tel was successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/seller/{s_workid}")
    public ResponseEntity<Seller> getSellerByWorkId(@PathVariable("s_workid") String s_workid) {
        Seller seller = posRepository.findSellerByWorkId(s_workid);

        if(seller != null) {
            return new ResponseEntity<>(seller, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/seller/tel/{s_workid}")
    public ResponseEntity<List<Seller_tel>> getSellerTelByWorkId(@PathVariable("s_workid") String s_workid) {
        try {
            List<Seller_tel> seller_tel = posRepository.findSellerTelByWorkId(s_workid);

            if (seller_tel != null) {
                return new ResponseEntity<>(seller_tel, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/checkin")
    public ResponseEntity<String> insertCheckin(@RequestBody Checkin checkin) {
        try {
            posRepository.insertCheckin(new Checkin(checkin.getS_workid()));
            return new ResponseEntity<>("Checkin was successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "/checkout/{s_workid}")
    public ResponseEntity<String> updateCheckin(@PathVariable("s_workid") String s_workid){
        List<Checkin> checkins = posRepository.findCheckinById(s_workid);
        try {
            for(Checkin _checkin : checkins){
                posRepository.updateCheckin(_checkin);
            }
            return new ResponseEntity<>("update checkin successfully", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/checkin/{s_workid}")
    public ResponseEntity<List<Checkin>> getCheckinById(@PathVariable("s_workid") String s_workid){
        try {
            List<Checkin> checkins = posRepository.findCheckinById(s_workid);
            if (checkins != null) {
                return new ResponseEntity<>(checkins, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Menu and Promotion

    @PostMapping(value = "/add/menu")
    public ResponseEntity<String> insertMenu(@RequestBody Menu menu){
        try {
            posRepository.insertMenu(new Menu(menu.getUnit(), menu.getFoodname(), menu.getAmount(), menu.getPrice()));
            return new ResponseEntity<>("Insert menu was successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/promotion")
    public ResponseEntity<String> createPromotion(@RequestBody Promotion promotion) {
        try {
            posRepository.insertPromotion(new Promotion(promotion.getPromotion_Name(), promotion.getPromotion_Price(), promotion.getPromotion_Code(),
                    promotion.getPromotion_Expire()));
            return new ResponseEntity<>("Promotion was create successfully.", HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/menu/havepromotion")
    public ResponseEntity<String> insertMenuHavePromotion(@RequestBody MenuHavePromotion menuHavePromotion){
        try {
            posRepository.insertMenuHavePromotion(new MenuHavePromotion(menuHavePromotion.getFoodname(),
                    menuHavePromotion.getPromotion_Code(), menuHavePromotion.getAmount()));
            return new ResponseEntity<>("Insert ... was successfully", HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "/add/menu/amount/{foodname}/{amount}")
    public ResponseEntity<String> addMenuAmount(@PathVariable("foodname") String foodname, @PathVariable("amount") int amount) {
        Menu menu = posRepository.findMenuByName(foodname);
        if(menu != null){
            menu.setAmount(posRepository.addMenuAmount(foodname, amount));
            return new ResponseEntity<>("Menu amount was update succesfully", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Wrong!!", HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping(value = "/reduce/menu/amount/{foodname}/{reduce}")
    public ResponseEntity<String> reduceMenuAmount(@PathVariable("foodname") String foodname, @PathVariable("reduce") int reduce) {
        Menu menu = posRepository.findMenuByName(foodname);
        if (menu != null){
            menu.setAmount(posRepository.reduceMenuAmount(foodname, reduce));
            return new ResponseEntity<>("Menu amount was update successfully.", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Not Found Jaa", HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/active/promotion")
    public ResponseEntity<List<Promotion>> getActivePromotion(@RequestParam(required = false) String string) {
        try {
            List<Promotion> promotions = posRepository.findActivePromotion();

            if (promotions != null) {
                return new ResponseEntity<>(promotions, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/menu")
    public ResponseEntity<List<Menu>> getAllMenu(@RequestParam(required = false) String name){
        try {
            List<Menu> menus = posRepository.findAllMenu();
            if (menus != null) {
                return new ResponseEntity<>(menus, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/search/promotion/{name}")
    public ResponseEntity<List<Promotion>> searchBox(@PathVariable("name") String name){
        try {
            List<Promotion> promotions = posRepository.findPromotionByNameContaining(name);
            if (promotions != null) {
                return new ResponseEntity<>(promotions, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping(value = "/delete/promotion/{Promotion_Code}")
    public ResponseEntity<String> deletePromotionByCode(@PathVariable("Promotion_Code") String Promotion_Code) {
        try {
            int result = (posRepository.deleteMenuHavePromotion(Promotion_Code)*posRepository.deletePromotionByCode(Promotion_Code));
            if (result == 0) {
                return new ResponseEntity<>("Cannot find Promotion with code=" + Promotion_Code, HttpStatus.OK);
            }
            return new ResponseEntity<>("Promotion was deleted successfully.", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Cannot delete promotion", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping(value = "/delete/member/{m_id}")
    public ResponseEntity<String> deleteMember(@PathVariable("m_id") String m_id){
        try{
            int result = posRepository.deleteMember(m_id);
            if(result == 0){
                return new ResponseEntity<>("Cannot find Member with id= "+ m_id,HttpStatus.OK);
            }
            return new ResponseEntity<>("Delete user "+ m_id+" successfully",HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return  new ResponseEntity<>("Cannot delete member",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @DeleteMapping(value = "/delete/invoice/{t_id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable("t_id") String t_id){
        try{
            int result = posRepository.deleteTransaction(t_id);
            if (result == 0){
                return new ResponseEntity<>("Cannot find Transaction id="+t_id,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Delete Transaction id "+t_id+" Successfully",HttpStatus.OK);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Cannot Delete Transaction",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping(value = "/delete/menu/{foodname}")
    public ResponseEntity<String> deleteMenuByName(@PathVariable("foodname") String foodname) {
        try {
            int result = posRepository.deleteMenuByName(foodname);
            if (result == 0) {
                return new ResponseEntity<>("Cannot find Menu with foodname=" + foodname, HttpStatus.OK);
            }
            return new ResponseEntity<>("Menu was deleted successfully", HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Cannot delete menu", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/promotion/{promotion_code}")
    public ResponseEntity<Promotion> getPromotionByCode(@PathVariable("promotion_code") String promotion_code) {
        Promotion promotion = posRepository.findPromotionByCode(promotion_code);
        if (promotion != null) {
            return new ResponseEntity<>(promotion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/menu/{foodname}")
    public ResponseEntity<Menu> findMenuByName(@PathVariable("foodname") String foodname){
        Menu menu = posRepository.findMenuByName(foodname);
        if(menu != null){
            return new ResponseEntity<>(menu, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping(value = "update/promotion/{Promotion_Code}")
    public ResponseEntity<String> updatePromotion(@PathVariable("Promotion_Code") String Promotion_Code,
                                                  @RequestBody Promotion promotion){
        Promotion _promotion = posRepository.findPromotionByCode(Promotion_Code);
        if (_promotion != null){
            _promotion.setPromotion_Name(promotion.getPromotion_Name());
            _promotion.setPromotion_Price(promotion.getPromotion_Price());
            _promotion.setPromotion_Expire(promotion.getPromotion_Expire());

            posRepository.updatePromotion(_promotion);
            return new ResponseEntity<>("Promotion was update successfully", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Cannot find Promotion with Code="+ Promotion_Code, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping(value = "/delete/menu/havepromotion/{Promotion_Code}")
    public ResponseEntity<String> deleteMenuHavePromotion(@PathVariable("Promotion_Code") String Promotion_Code) {
        try {
            int result = posRepository.deleteMenuHavePromotion(Promotion_Code);
            if (result == 0){
                return new ResponseEntity<>("Cannot find MenuHavePromotion with Promotion_Code=" + Promotion_Code, HttpStatus.OK);
            }
            return new ResponseEntity<>("MeneHavePromotion was deleted successfully", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("Cannot", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/enough/menu/promotion/{Promotion_Code}")
    public ResponseEntity<List<Menu>> enoughMenuPromotion(@PathVariable("Promotion_Code") String Promotion_Code){
        try {
            List<Menu> menus = posRepository.findAmountMenuInPromotion(Promotion_Code);
            if (menus != null) {
                return new ResponseEntity<>(menus, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Invoice


    @PostMapping(value = "/add/invoice")
    public ResponseEntity<String> createInvoice(@RequestBody Invoice invoice) {
        try {
             posRepository.insertInvoice(new Invoice(invoice.getPayment(), invoice.getPaymentMethod(), invoice.getDateTime(),
                    invoice.getTotalDiscount(), invoice.getNetPrice(), invoice.isTakeHome(), invoice.getMemberID(), invoice.getI_change()));
            return new ResponseEntity<>("Invoice was created successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/order/promotion")
    public ResponseEntity<String> insertOrderPromotion(@RequestBody OrderPromotion orderPromotion){
        try {
            posRepository.insertOrderPromotion(new OrderPromotion(orderPromotion.getInvoiceNo(),
                    orderPromotion.getPromotion_Code(), orderPromotion.getP_amount()));

            return new ResponseEntity<>("Successfully", HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping(value = "/add/order/menu")
    public ResponseEntity<String> insertOrderMenu(@RequestBody OrderMenu orderMenu){
        try {
            posRepository.insertOrderMenu(new OrderMenu(orderMenu.getInvoiceNo(), orderMenu.getFoodname(),
                    orderMenu.getM_amount()));
            return new ResponseEntity<>("add order menu was successfully", HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/print/invoice/{InvoiceNo}")
    public ResponseEntity<List<PrintInvoice>> getMemberByName(@PathVariable("InvoiceNo") int InvoiceNo) {
        try {
            List<PrintInvoice> printInvoices = posRepository.printInvoice(InvoiceNo);
            if (printInvoices != null){
                return new ResponseEntity<>(printInvoices, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/invoice/list/{offset}/{limit}")
    public ResponseEntity<List<Invoice>> getInvoiceList(@PathVariable("offset") int offset, @PathVariable("limit") int limit){
        try {
            List<Invoice> invoices = posRepository.getInvoice(limit, offset);
            if (invoices != null){
                return new ResponseEntity<>(invoices, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/invoice/list/{startDate}/{endDate}/{offset}/{limit}")
    public ResponseEntity<List<Invoice>> getInvoiceListByDate(@PathVariable("startDate") String startDate,
                                                              @PathVariable("endDate") String endDate,
                                                              @PathVariable("offset") int offset,
                                                              @PathVariable("limit") int limit) {
        try {
            List<Invoice> invoices = posRepository.getInvoiceByDay(startDate, endDate, limit, offset);
            if (invoices != null){
                return new ResponseEntity<>(invoices, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        }
    }
    @PostMapping(value = "/add/member")
    public ResponseEntity<String> createMember(@RequestBody Member member) {
        try {
            posRepository.insertMember(new Member(member.getM_id(), member.getM_password(), member.getM_rank(), member.getM_citizenId(),
                    member.getM_name(), member.getM_points(), member.getM_enroll(), member.getM_birthdate() ));
            return new ResponseEntity<>("Member was created successfully.", HttpStatus.CREATED);
        }catch (Exception e) {
            System.err.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping(value = "/update/member/{m_id}")
    public ResponseEntity<String> updateMember(@PathVariable("m_id") String m_id, @RequestBody Member member) {
        Member _member = posRepository.findMemberByMemberId(m_id);

        if(_member != null) {
            _member.setM_id(m_id);
            _member.setM_password(member.getM_password());
            _member.setM_rank(member.getM_rank());
            _member.setM_citizenId(member.getM_citizenId());
            _member.setM_name(member.getM_name());
            _member.setM_points(member.getM_points());
            _member.setM_enroll(member.getM_enroll());
            _member.setM_birthdate(member.getM_birthdate());

            posRepository.updateMember(_member);
            return new ResponseEntity<>("Member was update successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot find Member with m_id=" + m_id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/add/member/points/{m_id}/{points}")
    public ResponseEntity<String> addMemberPoints(@PathVariable("m_id") String m_id, @PathVariable("points") int points) {
        Member _member = posRepository.findMemberByMemberId(m_id);

        if (_member != null) {
            _member.setM_points(posRepository.addMemberPoint(points, m_id));
            return new ResponseEntity<>("Member points was update successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot find Member with m_id=" + m_id, HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping(value = "/add/member/tel")
    public ResponseEntity<String> insertMemberTel(@RequestBody Member_tel member_tel) {
        try {
            posRepository.insertMemberTel(new Member_tel(member_tel.getM_id(), member_tel.getM_tel()  ));
            return new ResponseEntity<>("Insert Member tel successfully", HttpStatus.CREATED);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping(value = "/update/menu/{foodname}")
    public  ResponseEntity<String> updateMenu(@PathVariable("foodname") String foodname, @RequestBody Menu menu){
        Menu updateMenu = posRepository.findMenuByName(foodname);

        if(updateMenu != null){
            updateMenu.setUnit(menu.getUnit());
            updateMenu.setAmount(menu.getAmount());
            updateMenu.setPrice(menu.getPrice());

            posRepository.updateMenu(updateMenu);
            return new ResponseEntity<>("OK! Som-O Gang Muk", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Noo!", HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping(value = "/update/member/tel/{m_tel}")
    public  ResponseEntity<String> updateMemberTel(@PathVariable("m_tel") String m_tel, @RequestBody Member_tel member_tel){
        Member_tel member_tel1;
        try {
            List<Member_tel> member_tels = posRepository.findMemberTelByMemberId(member_tel.getM_id());
            for (Member_tel member_tel_ : member_tels){
                if (member_tel_.getM_tel() == m_tel) {
                    member_tel1 = member_tel_;
                    break;
                }
            }
            member_tel1 = new Member_tel(member_tel.getM_id(), member_tel.getM_tel());
            //member_tel1.setM_tel(member_tel.getM_tel());
            posRepository.updateMemberTel(member_tel1, m_tel);
            return new ResponseEntity<>("Successfully", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        /*Menu updateMenu = posRepository.findMenuByName(foodname);

        if(updateMenu != null){
            updateMenu.setUnit(menu.getUnit());
            updateMenu.setAmount(menu.getAmount());
            updateMenu.setPrice(menu.getPrice());

            posRepository.updateMenu(updateMenu);
            return new ResponseEntity<>("OK! Som-O Gang Muk", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Noo!", HttpStatus.NOT_FOUND);
        }*/
    }
    @PutMapping(value = "/reduce/menu/promotion/{Promotion_Code}")
    public ResponseEntity<String> reduceMenuInPromotion(@PathVariable("Promotion_Code") String Promotion_Code) {
        try {
            List<MenuHavePromotion> menuHavePromotions = posRepository.findMenuHavePromotion(Promotion_Code);
            List<Menu> menus = new ArrayList<>();
            for (MenuHavePromotion menuHavePromotion : menuHavePromotions){
                menus.add(posRepository.findMenuByName(menuHavePromotion.getFoodname()));
            }
            for (Menu menu : menus){
                menu.setAmount(posRepository.reduceMenuInPromotion(Promotion_Code));
            }
            return new ResponseEntity<>("SuccessFully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Ahhh help me!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/member/name/{name}")
    public ResponseEntity<List<Member>> getMemberByName(@PathVariable("name") String name) {
        try {
            List<Member> members = posRepository.findMemberByName(name);
            if (members != null){
                return new ResponseEntity<>(members, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/member/{m_id}")
    public ResponseEntity<Member> getMemberByMemberId(@PathVariable("m_id") String m_id) {
        Member member = posRepository.findMemberByMemberId(m_id);

        if(member != null) {
            return new ResponseEntity<>(member, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/member/all")
    public  ResponseEntity<List<Member>> getAllMember(){
        List<Member> memberList = posRepository.getAllMember();
        return new ResponseEntity<>(memberList,HttpStatus.OK);
    }
    @GetMapping(value = "/menuhavepromo/{p_id}")
    public ResponseEntity<List<MenuHavePromotion>> getMenuHavePromo(@PathVariable("p_id") String p_id){
        List<MenuHavePromotion> menuList = posRepository.findMenuHavePromotion(p_id);
        return  new ResponseEntity<>(menuList,HttpStatus.OK);
    }

    @GetMapping(value = "/member/tel/{m_id}")
    public ResponseEntity<List<Member_tel>> getMemberTelByMemberId(@PathVariable("m_id") String m_id) {
        try {
            List<Member_tel> member_tels = posRepository.findMemberTelByMemberId(m_id);
            if (member_tels != null) {
                return new ResponseEntity<>(member_tels, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/login/{s_workid}/{s_password}")
    public ResponseEntity<Seller> login(@PathVariable("s_workid") String s_workid, @PathVariable("s_password") String s_password){
        Seller seller = posRepository.login(s_workid, s_password);
        if (seller != null) {
            return new ResponseEntity<>(seller, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping (value = "/testarray")
    public ResponseEntity<String> createSellers(@RequestBody List<Seller> sellers) {
        try {
            for (Seller seller : sellers) {
                posRepository.insertSeller(new Seller(
                        seller.getS_workid(),
                        seller.getS_name(),
                        seller.getS_password(),
                        seller.getS_citizenID(),
                        seller.getS_address(),
                        seller.getS_startDate()
                ));
            }
            return new ResponseEntity<>("create sellers was successful", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
