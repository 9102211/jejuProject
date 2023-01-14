package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadConditionResponseDTO;
import com.thejoen.jeju.repository.RoadConditionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadConditionService {

    private final RoadConditionRepository roadConditionRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<RoadConditionResponseDTO>> findAllMostRecentCondition() {
        List<RoadConditionResponseDTO> RoadConditionResponseDTOs = roadConditionRepository.findAllMostRecentCondition(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadCondition -> new RoadConditionResponseDTO(roadCondition))
                .collect(Collectors.toList());

        return ResponseEntity.ok(RoadConditionResponseDTOs);
    }
}
