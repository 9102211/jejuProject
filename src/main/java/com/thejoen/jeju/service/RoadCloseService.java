package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadCloseResponseDTO;
import com.thejoen.jeju.repository.RoadCloseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadCloseService {

    private final RoadCloseRepository roadCloseRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<RoadCloseResponseDTO>> findAllMostRecentClose() {
        List<RoadCloseResponseDTO> roadCloseResponseDTO = roadCloseRepository.findAllMostRecentClose(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadClose -> new RoadCloseResponseDTO(roadClose))
                .collect(Collectors.toList());

        return ResponseEntity.ok(roadCloseResponseDTO);
    }
}
