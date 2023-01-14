package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadWorkResponseDTO;
import com.thejoen.jeju.repository.RoadWorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadWorkService {

    private final RoadWorkRepository roadWorkRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<RoadWorkResponseDTO>> findAllMostRecentWork() {
        List<RoadWorkResponseDTO> roadWorkResponseDTOs = roadWorkRepository.findAllMostRecentWork(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadWork -> new RoadWorkResponseDTO(roadWork))
                .collect(Collectors.toList());

        return ResponseEntity.ok(roadWorkResponseDTOs);
    }
}
