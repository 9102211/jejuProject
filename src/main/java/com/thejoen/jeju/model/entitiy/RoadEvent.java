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
public class RoadEvent {

    @Id
    private String id;

    private Double lat;

    private Double lon;

    private Integer heading;

    private Long linkId;

    private String code;

    private LocalDateTime createdAt;

    private LocalDateTime lastUpdatedAt;
}
