package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.ForecastDataResponseDTO;
import com.thejoen.jeju.service.ForecastDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/forecastData")
public class ForecastDataApiController {

    private final ForecastDataService forecastDataService;

    @GetMapping("")
    public ResponseEntity<List<ForecastDataResponseDTO>> search() {

        return forecastDataService.search();
    }
}
