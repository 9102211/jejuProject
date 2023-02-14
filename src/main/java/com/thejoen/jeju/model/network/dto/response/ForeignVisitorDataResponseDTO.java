package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.ForeignVisitorData;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Getter
public class ForeignVisitorDataResponseDTO {
    private LocalDate month;

    private Long japan;

    private Long china;

    private Long hongkong;

    private Long taiwan;

    private Long singapore;

    private Long malaysia;

    private Long indonesia;

    private Long vietnam;

    private Long usa;

    private Long misc;

    private Long sum;

    public ForeignVisitorDataResponseDTO(ForeignVisitorData foreignVisitorData){
        this.month = foreignVisitorData.getMonth();
        this.japan = foreignVisitorData.getJapan();
        this.china = foreignVisitorData.getChina();
        this.hongkong = foreignVisitorData.getHongkong();
        this.taiwan = foreignVisitorData.getTaiwan();
        this.singapore = foreignVisitorData.getSingapore();
        this.malaysia = foreignVisitorData.getMalaysia();
        this.indonesia = foreignVisitorData.getIndonesia();
        this.vietnam = foreignVisitorData.getVietnam();
        this.usa = foreignVisitorData.getUsa();
        this.misc = foreignVisitorData.getMisc();
        this.sum = foreignVisitorData.getSum();
    }
}
