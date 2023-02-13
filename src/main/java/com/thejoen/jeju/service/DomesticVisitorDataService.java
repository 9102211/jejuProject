package com.thejoen.jeju.service;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;
import com.thejoen.jeju.repository.DomesticVisitorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DomesticVisitorDataService {
    private final DomesticVisitorDataRepository domesticVisitorDataRepository;

    public ResponseEntity<DomesticVisitorDataResponseDTO> read(LocalDate month) {
        DomesticVisitorData domesticVisitorData = domesticVisitorDataRepository.findById(month)
                .orElseThrow(()->new IllegalArgumentException("없는 데이터:"+month));
        return ResponseEntity.ok(new DomesticVisitorDataResponseDTO(domesticVisitorData));
    }

    public  ResponseEntity<List<DomesticVisitorDataResponseDTO>> search(DomesticVisitorDataRequestDTO request) {

        return ResponseEntity.ok(domesticVisitorDataRepository.search(request));
    }
}
