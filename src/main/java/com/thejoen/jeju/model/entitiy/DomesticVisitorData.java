package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class DomesticVisitorData {
    @Id
    private LocalDate month;

    private Long independentTour;

    private Long partialPackageTour;

    private Long packageTour;

    private Long leisureSports;
    private Long business;

    private Long relaxation;

    private Long visit;

    private Long education;

    private Long misc;

    private Long sum;

}
