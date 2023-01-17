package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class RoadCondition {

    @Id
    @GeneratedValue
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
}
