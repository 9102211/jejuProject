package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.response.RoadCloseResponseDTO;
import com.thejoen.jeju.service.RoadCloseServie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class RoadCloseApiController {

    private final RoadCloseServie roadCloseServie;

    @GetMapping("/roadClose")
    public ResponseEntity<List<RoadCloseResponseDTO>> findAllMostRecentEvent() {
        return roadCloseServie.findAllMostRecentEvent();
    }

}
