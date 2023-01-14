package com.thejoen.jeju.model.network.dto.response;


import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.model.enumclass.ReviewType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
public class ReviewResponseDTO {

    private Long id;

    private String writer;

    private String content;

    private String type;

    private Double score;

    private String createdAt;

    public ReviewResponseDTO(Long id, String writer, String content, ReviewType type, Double score, LocalDateTime createdAt) {
        this.id = id;
        this.writer = writer;
        this.content = content;
        this.type = type.getTitle();
        this.score = score;
        this.createdAt = createdAt.format(DateTimeFormatter.ofPattern("yy/MM/dd"));;
    }
}
