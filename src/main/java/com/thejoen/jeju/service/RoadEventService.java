package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadEventResponseDTO;
import com.thejoen.jeju.repository.RoadEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadEventService {

    private final RoadEventRepository roadEventRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<RoadEventResponseDTO>> findAllMostRecentEvent() {
        List<RoadEventResponseDTO> roadEventResponseDTOs = roadEventRepository.findAllMostRecentEvent(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadEvent -> new RoadEventResponseDTO(roadEvent))
                .collect(Collectors.toList());

        return ResponseEntity.ok(roadEventResponseDTOs);
    }
}
