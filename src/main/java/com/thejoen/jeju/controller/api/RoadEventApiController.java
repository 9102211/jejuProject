package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.entitiy.RoadEvent;
import com.thejoen.jeju.model.network.dto.response.RoadEventResponseDTO;
import com.thejoen.jeju.service.RoadEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class RoadEventApiController {

    private final RoadEventService roadEventService;

    @GetMapping("/roadEvent")
    public ResponseEntity<List<RoadEventResponseDTO>> findAllMostRecentEvent() {
        return roadEventService.findAllMostRecentEvent();
    }
}
