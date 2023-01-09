package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.RoadConditionResponseDTO;
import com.thejoen.jeju.model.network.dto.response.RoadEventResponseDTO;
import com.thejoen.jeju.service.RoadConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class RoadConditionApiController {

    private final RoadConditionService roadConditionService;

    @GetMapping("/roadCondition")
    public ResponseEntity<List<RoadConditionResponseDTO>> findAllMostRecentEvent() {
        return roadConditionService.findAllMostRecentEvent();
    }
}
