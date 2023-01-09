package com.thejoen.jeju.model.network.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewSearchRequestDTO {

    private Long rentalCarId;

    private List<String> type;


}
