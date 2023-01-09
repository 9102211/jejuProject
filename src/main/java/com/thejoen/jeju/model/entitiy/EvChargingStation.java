package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class EvChargingStation {

    @Id
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
}
