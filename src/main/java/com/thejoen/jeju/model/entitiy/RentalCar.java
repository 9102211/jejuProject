package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class RentalCar {

    @Id
    private Long id;

    private String name;

    private String address;

    private Integer numberOfTotalVehicles;

    private Integer numberOfVans;

    private Integer numberOfVehicles;

    private Integer numberOfElectricVehicles;

    private String openTime;

    private String closeTime;

    private String tel;

    private String homePage;

    private Double lat;

    private Double lon;

    private String image;

    private Double naverScore;

    private Double kakaoScore;

    private Double googleScore;
}
