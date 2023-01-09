package com.thejoen.jeju.model.network.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
public class RentalCarSearchRequestDTO {

    private Boolean hasEV;

    private Boolean hasVan;


    public Boolean hasEV() {
        return this.hasEV;
    }

    public Boolean hasVan() {
        return this.hasVan;
    }
}
