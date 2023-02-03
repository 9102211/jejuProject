package com.thejoen.jeju.model.network.dto.response;

import com.thejoen.jeju.model.entitiy.Content;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
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

    private Double naverScore;

    private Double kakaoScore;

    private Double googleScore;

    private String category;

    //public ContentResponseDTO(Long id, String title, String address, Double lat, Double)

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
        this.naverScore = content.getNaverScore();
        this.kakaoScore = content.getKakaoScore();
        this.googleScore = content.getGoogleScore();
        this.category = content.getCategory();

    }
}