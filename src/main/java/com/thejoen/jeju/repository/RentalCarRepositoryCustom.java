package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

public interface RentalCarRepositoryCustom {
    Page<RentalCarResponseDTO> search(RentalCarSearchRequestDTO request, Pageable pageable);
}
