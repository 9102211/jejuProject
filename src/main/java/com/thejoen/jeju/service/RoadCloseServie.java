package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadCloseResponseDTO;
import com.thejoen.jeju.repository.RoadCloseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadCloseServie {

    private final RoadCloseRepository roadCloseRepository;


    public ResponseEntity<List<RoadCloseResponseDTO>> findAllMostRecentEvent() {
        List<RoadCloseResponseDTO> roadCloseResponseDTO = roadCloseRepository.findAllMostRecentEvent(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadClose -> new RoadCloseResponseDTO(roadClose))
                .collect(Collectors.toList());

        return ResponseEntity.ok(roadCloseResponseDTO);
    }
}
