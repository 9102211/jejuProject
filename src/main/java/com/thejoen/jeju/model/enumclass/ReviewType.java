package com.thejoen.jeju.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReviewType {

    NAVER("네이버"),
    KAKAO("카카오"),
    GOOGLE("구글");

    private String title;
}
