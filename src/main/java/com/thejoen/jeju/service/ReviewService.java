package com.thejoen.jeju.service;

import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.ReviewSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ReviewResponseDTO;
import com.thejoen.jeju.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<PaginationDTO<ReviewResponseDTO>> search(ReviewSearchRequestDTO request, Pageable pageable) {

        return ResponseEntity.ok(new PaginationDTO<>(reviewRepository.search(request, pageable)));
    }
}
