package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.GasStation;
import lombok.Getter;
@Getter
public class GasStationResponseDTO {
    private String id;

    private String name;

    private String addr;

    private String tel;

    private Character lpgYN;

    private Double lat;

    private Double lon;

    public GasStationResponseDTO(GasStation gasStation) {
        this.id = gasStation.getId();
        this.name = gasStation.getName();
        this.addr = gasStation.getAddr();
        this.tel = gasStation.getTel();
        this.lpgYN = gasStation.getLpgYN();
        this.lat = gasStation.getLat();
        this.lon = gasStation.getLon();
    }
}
