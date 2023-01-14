package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.RoadWorkResponseDTO;
import com.thejoen.jeju.service.RoadWorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class RoadWorkApiController {

    private final RoadWorkService roadWorkService;

    @GetMapping("/roadWork")
    public ResponseEntity<List<RoadWorkResponseDTO>> findAllMostRecentEvent() {
        return roadWorkService.findAllMostRecentWork();
    }
}
