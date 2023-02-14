package com.thejoen.jeju.service;

import com.thejoen.jeju.model.entitiy.ForeignVisitorData;
import com.thejoen.jeju.model.network.dto.request.ForeignVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ForeignVisitorDataResponseDTO;
import com.thejoen.jeju.repository.ForeignVisitorDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ForeignVisitorDataService {
    private final ForeignVisitorDataRepository foreignVisitorDataRepository;

    public ResponseEntity<ForeignVisitorDataResponseDTO> read(LocalDate month) {
        ForeignVisitorData foreignVisitorData = foreignVisitorDataRepository.findById(month)
                .orElseThrow(()->new IllegalArgumentException("없는 데이터:"+month));
        return ResponseEntity.ok(new ForeignVisitorDataResponseDTO(foreignVisitorData));
    }

    public  ResponseEntity<List<ForeignVisitorDataResponseDTO>> search(ForeignVisitorDataRequestDTO request) {

        return ResponseEntity.ok(foreignVisitorDataRepository.search(request));
    }
}
