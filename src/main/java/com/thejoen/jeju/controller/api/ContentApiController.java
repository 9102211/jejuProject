package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.ContentSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import com.thejoen.jeju.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/content")
public class ContentApiController {

    private  final ContentService contentService;

    @GetMapping("/{id}")
    public ResponseEntity<ContentResponseDTO> read(@PathVariable String id) {
        return contentService.read(id);
    }

    @GetMapping("")
    public ResponseEntity<PaginationDTO<ContentResponseDTO>> search(@ModelAttribute ContentSearchRequestDTO request, @PageableDefault(size = 5) Pageable pageable) {
        return contentService.search(request, pageable);
    }
}
