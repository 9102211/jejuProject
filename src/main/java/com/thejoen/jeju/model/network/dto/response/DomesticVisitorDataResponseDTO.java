package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class DomesticVisitorDataResponseDTO {
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

    public DomesticVisitorDataResponseDTO(DomesticVisitorData domesticVisitorData){
        this.month = domesticVisitorData.getMonth();
        this.independentTour = domesticVisitorData.getIndependentTour();
        this.partialPackageTour = domesticVisitorData.getPartialPackageTour();
        this.packageTour = domesticVisitorData.getPackageTour();
        this.leisureSports = domesticVisitorData.getLeisureSports();
        this.business = domesticVisitorData.getBusiness();
        this.relaxation = domesticVisitorData.getRelaxation();
        this.visit = domesticVisitorData.getVisit();
        this.education = domesticVisitorData.getEducation();
        this.misc = domesticVisitorData.getMisc();
        this.sum = domesticVisitorData.getSum();
    }
}
