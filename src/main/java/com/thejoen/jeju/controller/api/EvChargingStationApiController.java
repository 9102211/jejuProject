package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.EvChargingStationResponseDTO;
import com.thejoen.jeju.service.EvChargingStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class EvChargingStationApiController {

    private final EvChargingStationService evChargingStationService;

    @GetMapping("/evChargingStation")
    public ResponseEntity<List<EvChargingStationResponseDTO>> findAll() {
        return evChargingStationService.findAll();
    }
}
