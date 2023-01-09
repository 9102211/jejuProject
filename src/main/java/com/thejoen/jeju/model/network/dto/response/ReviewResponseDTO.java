package com.thejoen.jeju.model.network.dto.response;


import com.thejoen.jeju.model.entitiy.RentalCar;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDTO {

    private Long id;

    private String writer;

    private String content;

    private String type;

    private Double score;

    private LocalDateTime createdAt;
}
