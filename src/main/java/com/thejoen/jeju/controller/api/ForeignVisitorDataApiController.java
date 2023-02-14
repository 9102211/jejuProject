package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.request.ForeignVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;
import com.thejoen.jeju.model.network.dto.response.ForeignVisitorDataResponseDTO;
import com.thejoen.jeju.service.DomesticVisitorDataService;
import com.thejoen.jeju.service.ForeignVisitorDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/foreignVisitorData")
public class ForeignVisitorDataApiController {
    private final ForeignVisitorDataService foreignVisitorDataService;

    @GetMapping("/{month}")
    public ResponseEntity<ForeignVisitorDataResponseDTO> read(@PathVariable @DateTimeFormat(pattern = "yyyyMMdd") LocalDate month){

        return foreignVisitorDataService.read(month);
    }

    @GetMapping("")
    public ResponseEntity<List<ForeignVisitorDataResponseDTO>> search(@ModelAttribute ForeignVisitorDataRequestDTO request){
        return foreignVisitorDataService.search(request);
    }

}
