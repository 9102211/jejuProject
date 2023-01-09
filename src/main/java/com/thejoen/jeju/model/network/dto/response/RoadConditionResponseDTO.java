package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.RoadCondition;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RoadConditionResponseDTO {
    private Long id;

    private Double lat;

    private Double lon;

    private Integer heading;

    private Long linkId;

    private Long visibility;

    private Double snow;

    private Double roadTemp;

    private Double waterFilm;

    private Double friction;

    private String code;

    private LocalDateTime createdAt;


    public RoadConditionResponseDTO(RoadCondition roadCondition) {
        this.id = roadCondition.getId();
        this.lat = roadCondition.getLat();
        this.lon = roadCondition.getLon();
        this.heading = roadCondition.getHeading();
        this.linkId = roadCondition.getLinkId();
        this.visibility = roadCondition.getVisibility();
        this.snow = roadCondition.getSnow();
        this.roadTemp = roadCondition.getRoadTemp();
        this.waterFilm = roadCondition.getWaterFilm();
        this.friction = roadCondition.getFriction();
        this.code = roadCondition.getCode();
        this.createdAt = roadCondition.getCreatedAt();
    }
}
