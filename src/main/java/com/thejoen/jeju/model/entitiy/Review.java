package com.thejoen.jeju.model.entitiy;

import com.thejoen.jeju.model.enumclass.ReviewType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    private String writer;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    private ReviewType type;

    private Double score;

    private LocalDateTime createdAt;

    @ManyToOne
    private RentalCar rentalCar;
}
