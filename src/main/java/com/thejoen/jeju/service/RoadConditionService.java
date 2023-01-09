package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.RoadConditionResponseDTO;
import com.thejoen.jeju.repository.RoadConditionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RoadConditionService {

    private final RoadConditionRepository roadConditionRepository;

    public ResponseEntity<List<RoadConditionResponseDTO>> findAllMostRecentEvent() {
        List<RoadConditionResponseDTO> RoadConditionResponseDTOs = roadConditionRepository.findAllMostRecentEvent(LocalDateTime.now().minusMinutes(30))
                .stream().map(roadCondition -> new RoadConditionResponseDTO(roadCondition))
                .collect(Collectors.toList());

        return ResponseEntity.ok(RoadConditionResponseDTOs);
    }
}
