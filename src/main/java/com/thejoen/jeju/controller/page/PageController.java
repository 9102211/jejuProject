package com.thejoen.jeju.controller.page;

import com.thejoen.jeju.service.RentalCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class PageController {

    private final RentalCarService rentalCarService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/rental-car")
    public String rentalCar() {
        return "rental-car";
    }

    @GetMapping("/bigdata/realtime-map")
    public String realTimeMap() {
        return "realtime-map";
    }

    @GetMapping("/bigdata/dashboard")
    public String something() {
        return "dashboard";
    }

    @GetMapping(value = {"/tour", "/food", "/stay", "/shopping"})
    public String content() { return "content"; }

    @GetMapping("/search")
    public String search() {return "search";}
}
