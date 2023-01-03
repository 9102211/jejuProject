package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.Pagination;
import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.repository.RentalCarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RentalCarService {

    private final RentalCarRepository rentalCarRepository;

    public ResponseEntity<RentalCarResponseDTO> read(Long id) {

        RentalCar rentalCar = rentalCarRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("없는 업체 입니다. 업체 id : " + id));

        return ResponseEntity.ok(new RentalCarResponseDTO(rentalCar));
    }

//    @Transactional(readOnly = true)
//    public ResponseEntity<List<RentalCarResponseDTO>> findAll() {
//        List<RentalCarResponseDTO> rentalCarResponseDTOs = rentalCarRepository.findAll().stream()
//                .map(rentalCar -> new RentalCarResponseDTO(rentalCar))
//                .collect(Collectors.toList())
//                ;
//
//        return ResponseEntity.ok(rentalCarResponseDTOs);
//    }

    @Transactional(readOnly = true)
    public ResponseEntity<PaginationDTO<RentalCarResponseDTO>> search(RentalCarSearchRequestDTO request, Pageable pageable) {
        return ResponseEntity.ok(new PaginationDTO<>(rentalCarRepository.search(request, pageable)));
    }
}