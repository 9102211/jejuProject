package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.RoadClose;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class RoadCloseResponseDTO {
    private String id;

    private Double lat;

    private Double lon;

    private Integer heading;

    private Long linkId;

    private Long wholeLane;

    private String blockLane;

    private String text;

    private String createdAt;

    private String lastUpdatedAt;

    public RoadCloseResponseDTO(RoadClose roadClose) {
        this.id = roadClose.getId();
        this.lat = roadClose.getLat();
        this.lon = roadClose.getLon();
        this.heading = roadClose.getHeading();
        this.linkId = roadClose.getLinkId();
        this.wholeLane = roadClose.getWholeLane();
        this.blockLane = roadClose.getBlockLane();
        this.text = roadClose.getText();
        this.createdAt = roadClose.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));;
        this.lastUpdatedAt = roadClose.getLastUpdatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));;
    }
}
