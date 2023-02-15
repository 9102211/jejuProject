package com.thejoen.jeju.controller.page;

import com.thejoen.jeju.service.DomesticVisitorDataService;
import com.thejoen.jeju.service.RentalCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;

@RequiredArgsConstructor
@Controller
public class PageController {

    private final DomesticVisitorDataService domesticVisitorDataService;

    @GetMapping("/")
    public String index() {
        return "index";
    }


    @GetMapping("/bigdata/realtime-map")
    public String realTimeMap() {
        return "realtime-map";
    }

    @GetMapping("/bigdata/dashboard")
    public String dashBoard(Model model) {

        LocalDate maxMonth = domesticVisitorDataService.findMaxMonth();

        model.addAttribute("maxYear", maxMonth.getYear());

        model.addAttribute("maxMonth", maxMonth.getMonthValue());

        return "dashboard";
    }

    @GetMapping(value = {"/tour", "/food", "/stay", "/shopping", "/rentalcar"})
    public String content() { return "content"; }

    @GetMapping("/search")
    public String search() {return "search";}
}
