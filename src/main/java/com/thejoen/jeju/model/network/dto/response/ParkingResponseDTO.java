package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.Parking;
import lombok.Getter;

@Getter
public class ParkingResponseDTO {
    private String id;

    private String name;

    private String type;

    private String addr;

    private String free;

    private Integer countOfArea;

    private String operatingDate;

    private Long basicTime;

    private Long basicFee;

    private Long extraTime;

    private Long extraFee;

    private Double lat;

    private Double lon;

    public ParkingResponseDTO(Parking parking) {
        this.id = parking.getId();
        this.name = parking.getName();
        this.type = parking.getType();
        this.addr = parking.getAddr();
        this.free = parking.getFree();
        this.countOfArea = parking.getCountOfArea();
        this.operatingDate = parking.getOperatingDate();
        this.basicTime = parking.getBasicTime();
        this.basicFee = parking.getBasicFee();
        this.extraTime = parking.getExtraTime();
        this.extraFee = parking.getExtraFee();
        this.lat = parking.getLat();
        this.lon = parking.getLon();
    }
}
