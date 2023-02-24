package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.ReviewSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ReviewResponseDTO;
import com.thejoen.jeju.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("api/v1")
@RestController
public class ReviewApiController {

    private final ReviewService reviewService;

    @GetMapping("/review")
    public ResponseEntity<PaginationDTO<ReviewResponseDTO>> search(@ModelAttribute ReviewSearchRequestDTO request, @PageableDefault Pageable pageable) {
        System.out.println(request.getContentId());
        return reviewService.search(request, pageable);
    }
}
