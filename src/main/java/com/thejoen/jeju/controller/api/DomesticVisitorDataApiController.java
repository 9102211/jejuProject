package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;
import com.thejoen.jeju.service.DomesticVisitorDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/domesticVisitorData")
public class DomesticVisitorDataApiController {
    private final DomesticVisitorDataService domesticVisitorDataService;

    @GetMapping("/{month}")
    public ResponseEntity<DomesticVisitorDataResponseDTO> read(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate month){

        return domesticVisitorDataService.read(month);
    }

    @GetMapping("")
    public ResponseEntity<List<DomesticVisitorDataResponseDTO>> search(@ModelAttribute DomesticVisitorDataRequestDTO request){
        return domesticVisitorDataService.search(request);
    }

}
