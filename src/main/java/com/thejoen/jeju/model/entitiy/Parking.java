package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Parking {

    @Id
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



}
