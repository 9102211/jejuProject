package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.RoadEvent;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class RoadEventResponseDTO {
    private String id;

    private Double lat;

    private Double lon;

    private Integer heading;

    private Long linkId;

    private String code;

    private String createdAt;

    private String lastUpdatedAt;

    public RoadEventResponseDTO (RoadEvent roadEvent) {
        this.id = roadEvent.getId();
        this.lat = roadEvent.getLat();
        this.lon = roadEvent.getLon();
        this.heading = roadEvent.getHeading();
        this.linkId = roadEvent.getLinkId();
        this.code = roadEvent.getCode();
        this.createdAt = roadEvent.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));
        this.lastUpdatedAt = roadEvent.getLastUpdatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));
    }
}
