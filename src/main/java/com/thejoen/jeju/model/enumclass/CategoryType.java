package com.thejoen.jeju.model.enumclass;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryType {

    TOUR("관광지", "관광지 관련 정보"),
    FOOD("음식점", "음식점 관련 정보"),
    STAY("숙박", "숙박업체 정보"),
    SHOPPING("쇼핑", "쇼핑 정보");


    private String title;

    private String description;







}
