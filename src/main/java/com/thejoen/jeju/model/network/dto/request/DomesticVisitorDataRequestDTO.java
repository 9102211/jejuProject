package com.thejoen.jeju.model.network.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
public class DomesticVisitorDataRequestDTO {

    @DateTimeFormat(pattern = "yyyyMMdd")
    LocalDate startDate;

    @DateTimeFormat(pattern = "yyyyMMdd")
    LocalDate endDate;

}
