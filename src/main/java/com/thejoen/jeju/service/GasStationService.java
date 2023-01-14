package com.thejoen.jeju.service;


import com.thejoen.jeju.model.network.dto.response.EvChargingStationResponseDTO;
import com.thejoen.jeju.model.network.dto.response.GasStationResponseDTO;
import com.thejoen.jeju.repository.GasStationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GasStationService {

    private final GasStationRepository gasStationRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<GasStationResponseDTO>> findAll() {
        List<GasStationResponseDTO> GasStationResponseDTOs =
                gasStationRepository.findAll().stream()
                        .map(gasStation -> new GasStationResponseDTO(gasStation))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(GasStationResponseDTOs);
    }

}
