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
    public String index(Model model) {

        return "index";
    }

    @GetMapping("/bigdata/realtime-map")
    public String realTimeMap() {

        return "realtime-map";
    }

    @GetMapping("/bigdata/something")
    public String something() {
        return "something";
    }

}
