package com.thejoen.jeju.service;

import com.thejoen.jeju.model.entitiy.Content;
import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.ContentSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import com.thejoen.jeju.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ContentService {

    private final ContentRepository contentRepository;
    public ResponseEntity<ContentResponseDTO> read(String id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("없는 컨텐츠입니다."+ id));
        return ResponseEntity.ok(new ContentResponseDTO(content));

    }
    @Transactional(readOnly = true)
    public ResponseEntity<PaginationDTO<ContentResponseDTO>> search(ContentSearchRequestDTO request,Pageable pageable) {
        return ResponseEntity.ok(new PaginationDTO<>(contentRepository.search(request, pageable)));
    }
}
