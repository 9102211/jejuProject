package com.thejoen.jeju.model.network.dto.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverBlogItemDTO {

    private String title;
    private String link;
    private String description;

    private String bloggername;
}
