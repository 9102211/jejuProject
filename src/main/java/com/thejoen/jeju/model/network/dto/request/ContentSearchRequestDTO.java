package com.thejoen.jeju.model.network.dto.request;

import com.thejoen.jeju.model.enumclass.CategoryType;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
public class ContentSearchRequestDTO {


    private List<String> idList;
    private CategoryType category;
    private String keyword;
    private String weather;


    public void setIdList(String idList) {
        this.idList = Arrays.asList(idList.split(","));
    }
    public void setCategory(String category) {
        this.category = CategoryType.valueOf(category.toUpperCase());
    }
    public void setKeyword(String keyword) { this.keyword = keyword;}

    public void setWhether(String weather) {this.weather = weather;}
}
