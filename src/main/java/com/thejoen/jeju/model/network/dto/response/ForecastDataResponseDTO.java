package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.ForecastData;
import lombok.Getter;

import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Getter
public class ForecastDataResponseDTO {

    private String month;

    private Long countOfVisitor;


    public ForecastDataResponseDTO(ForecastData forecastData) {

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YY년MM월");

        this.month = forecastData.getMonth().format(dateTimeFormatter);

        this.countOfVisitor = forecastData.getCountOfVisitor();

    }



}
