package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.EvChargingStationResponseDTO;
import com.thejoen.jeju.model.network.dto.response.RoadEventResponseDTO;
import com.thejoen.jeju.repository.EvChargingStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class EvChargingStationService {

    private final EvChargingStationRepository evChargingStationRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<EvChargingStationResponseDTO>> findAll() {
        List<EvChargingStationResponseDTO> evChargingStationResponseDTOs =
                evChargingStationRepository.findAll().stream()
                .map(evChargingStation -> new EvChargingStationResponseDTO(evChargingStation))
                .collect(Collectors.toList());

        return ResponseEntity.ok(evChargingStationResponseDTOs);
    }
}
