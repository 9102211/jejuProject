package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.RoadWork;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class RoadWorkResponseDTO {

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

        public RoadWorkResponseDTO(RoadWork roadWork) {
            this.id = roadWork.getId();
            this.lat = roadWork.getLat();
            this.lon = roadWork.getLon();
            this.heading = roadWork.getHeading();
            this.linkId = roadWork.getLinkId();
            this.wholeLane = roadWork.getWholeLane();
            this.blockLane = roadWork.getBlockLane();
            this.text = roadWork.getText();
            this.createdAt = roadWork.getCreatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));
            this.lastUpdatedAt = roadWork.getLastUpdatedAt().format(DateTimeFormatter.ofPattern("yy-MM-dd HH:mm"));
        }
}
