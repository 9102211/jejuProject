package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import com.thejoen.jeju.service.RentalCarService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/rentalCar")
public class RentalCarApiController {

    private final RentalCarService rentalCarService;

    @GetMapping("/{id}")
    public ResponseEntity<RentalCarResponseDTO> read(@PathVariable Long id) {
        return rentalCarService.read(id);
    }

    @GetMapping("")
    public ResponseEntity<PaginationDTO<RentalCarResponseDTO>> search(@ModelAttribute RentalCarSearchRequestDTO request, @PageableDefault(size = 5) Pageable pageable) {
        return rentalCarService.search(request, pageable);
    }
}
