package com.thejoen.jeju.model.network.dto.response;


import com.thejoen.jeju.model.enumclass.ReviewType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@NoArgsConstructor
public class ReviewResponseDTO {

    private Long id;

    private String writer;

    private String detail;

    private String type;

    private Double score;

    private String createdAt;

    public ReviewResponseDTO(Long id, String writer, String detail, ReviewType type, Double score, LocalDateTime createdAt) {
        this.id = id;
        this.writer = writer;
        this.detail = detail;
        this.type = type.getTitle();
        this.score = score;
        this.createdAt = createdAt != null ? createdAt.format(DateTimeFormatter.ofPattern("yy/MM/dd")) : null;
    }
}
