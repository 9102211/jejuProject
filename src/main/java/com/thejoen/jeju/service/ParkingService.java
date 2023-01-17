package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.dto.response.ParkingResponseDTO;
import com.thejoen.jeju.repository.ParkingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ParkingService {

    private final ParkingRepository parkingRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<List<ParkingResponseDTO>> findAll() {
        List<ParkingResponseDTO> ParkingResponseDTOs =
                parkingRepository.findAll().stream()
                        .map(gasStation -> new ParkingResponseDTO(gasStation))
                        .collect(Collectors.toList());

        return ResponseEntity.ok(ParkingResponseDTOs);
    }
}
