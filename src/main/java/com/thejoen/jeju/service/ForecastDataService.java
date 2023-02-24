package com.thejoen.jeju.service;

import com.thejoen.jeju.model.entitiy.ForecastData;
import com.thejoen.jeju.model.network.dto.response.ForecastDataResponseDTO;
import com.thejoen.jeju.model.network.dto.response.ParkingResponseDTO;
import com.thejoen.jeju.repository.ForecastDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class ForecastDataService {

    private final ForecastDataRepository forecastDataRepository;


    public ResponseEntity<List<ForecastDataResponseDTO>> search() {



        List<ForecastDataResponseDTO> forecastDataResponseDTOS = forecastDataRepository.findLastTen().stream()
                .map(forecastData -> new ForecastDataResponseDTO(forecastData))
                .collect(Collectors.toList());


        return ResponseEntity.ok(forecastDataResponseDTOS);
    }
}
