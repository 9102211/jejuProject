package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.Content;
import com.thejoen.jeju.model.enumclass.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentResponseDTO {
    private String id;

    private String title;

    private String address;

    private String description;

    private Double lat;

    private Double lon;

    private String tel;

    private  String image;

    private String tag;

    private String homepage;

    private String openTime;

    private Double naverScore;

    private Double kakaoScore;

    private Double googleScore;

    private String category;

    public ContentResponseDTO(String id, String title, String address, String description, Double lat, Double lon, String tel, String image, String tag, String homepage, String openTime, Double naverScore, Double kakaoScore, Double googleScore, CategoryType category) {
        this.id = id;
        this.title = title;
        this.address = address.replace("제주특별자치도 ", "");
        this.description = description;
        this.lat = lat;
        this.lon = lon;
        this.tel = tel;
        this.image = image;
        this.tag = tag;
        this.homepage = homepage;
        this.openTime = openTime;
        this.naverScore = naverScore;
        this.kakaoScore = kakaoScore;
        this.googleScore = googleScore;
        this.category = category.getTitle();
    }

    public ContentResponseDTO(Content content) {
        this.id = content.getId();
        this.title = content.getTitle();
        this.address = content.getAddress();
        this.description = content.getDescription();
        this.lat = content.getLat();
        this.lon = content.getLon();
        this.tel = content.getTel();
        this.image = content.getImage();
        this.tag = content.getTag();
        this.homepage = content.getHomepage();
        this.openTime = content.getOpenTime();
        this.naverScore = content.getNaverScore();
        this.kakaoScore = content.getKakaoScore();
        this.googleScore = content.getGoogleScore();
        this.category = content.getCategory().getTitle();

    }
}