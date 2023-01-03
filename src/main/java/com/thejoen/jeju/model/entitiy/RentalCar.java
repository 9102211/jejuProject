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
    @GeneratedValue
    private Long id;

    private String name;

    private String address;

    private Integer numberOfTotalVehicles;

    private Integer numberOfVans;

    private Integer numberOfVehicles;

    private Integer numberOfElectricVehicles;

    private LocalDateTime openTime;

    private LocalDateTime closeTime;

    private String tel;

    private String homePage;

    private Double lat;

    private Double lon;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rentalCar")
//    private List<Review> reviewList;
}
