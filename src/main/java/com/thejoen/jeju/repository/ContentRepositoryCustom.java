package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.network.dto.request.ContentSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContentRepositoryCustom {
    Page<ContentResponseDTO> search(ContentSearchRequestDTO request, Pageable pageable);
}
