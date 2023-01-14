package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class RoadWork {

    @Id
    private String id;

    private Double lat;

    private Double lon;

    private Integer heading;

    private Long linkId;

    private Long wholeLane;

    private String blockLane;

    private String text;

    private LocalDateTime createdAt;

    private LocalDateTime lastUpdatedAt;
}
