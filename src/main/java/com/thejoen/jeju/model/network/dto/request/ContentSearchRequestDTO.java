package com.thejoen.jeju.model.network.dto.request;

import com.thejoen.jeju.model.enumclass.CategoryType;
import lombok.Getter;
import lombok.Setter;

@Getter
public class ContentSearchRequestDTO {

    private CategoryType category;
    private String keyword;


    public void setCategory(String category) {
        this.category = CategoryType.valueOf(category.toUpperCase());
    }
    public void setKeyword(String keyword) { this.keyword = keyword;}
}
