package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.EvChargingStation;
import lombok.Getter;

@Getter
public class EvChargingStationResponseDTO {

    private String id;

    private String name;

    private String addr;

    private String useTime;

    private String free;

    private String bName;

    private String bCall;

    private Double lat;

    private Double lon;

    private Long countOfTypeOne;

    private Long countOfTypeTwo;

    private Long countOfTypeThree;

    private Long countOfTypeFour;

    private Long countOfTypeFive;

    private Long countOfTypeSix;

    private Long countOfTypeSeven;

    private Long slow;

    private Long fast;

    public EvChargingStationResponseDTO(EvChargingStation evChargingStation) {
        this.id = evChargingStation.getId();
        this.name = evChargingStation.getName();
        this.addr = evChargingStation.getAddr();
        this.useTime = evChargingStation.getUseTime();
        this.free = evChargingStation.getFree();
        this.bName = evChargingStation.getBName();
        this.bCall = evChargingStation.getBCall();
        this.lat = evChargingStation.getLat();
        this.lon = evChargingStation.getLon();
        this.countOfTypeOne = evChargingStation.getCountOfTypeOne();
        this.countOfTypeTwo = evChargingStation.getCountOfTypeTwo();
        this.countOfTypeThree = evChargingStation.getCountOfTypeThree();
        this.countOfTypeFour = evChargingStation.getCountOfTypeFour();
        this.countOfTypeFive = evChargingStation.getCountOfTypeFive();
        this.countOfTypeSix = evChargingStation.getCountOfTypeSix();
        this.countOfTypeSeven = evChargingStation.getCountOfTypeSeven();
        this.slow = evChargingStation.getSlow();
        this.fast = evChargingStation.getFast();
    }
}
