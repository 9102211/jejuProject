package com.thejoen.jeju.model.network.dto.request;

import com.thejoen.jeju.model.enumclass.ReviewType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewSearchRequestDTO {

    private Long rentalCarId;

    private List<ReviewType> type;
}
