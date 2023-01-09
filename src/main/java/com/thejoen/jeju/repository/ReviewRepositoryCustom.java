package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.network.dto.request.ReviewSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ReviewResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewRepositoryCustom {

    Page<ReviewResponseDTO> search(ReviewSearchRequestDTO request, Pageable pageable);
}
