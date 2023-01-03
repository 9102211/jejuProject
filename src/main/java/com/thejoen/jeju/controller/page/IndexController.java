package com.thejoen.jeju.controller.page;

import com.thejoen.jeju.service.RentalCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final RentalCarService rentalCarService;

    @GetMapping
    public String index(Model model) {

        return "index";
    }
}
