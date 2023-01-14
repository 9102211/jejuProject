package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.EvChargingStationResponseDTO;
import com.thejoen.jeju.model.network.dto.response.GasStationResponseDTO;
import com.thejoen.jeju.service.GasStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class GasStationApiController {

    private final GasStationService gasStationService;

    @GetMapping("/gasStation")
    public ResponseEntity<List<GasStationResponseDTO>> findAll() {
        return gasStationService.findAll();
    }
}
