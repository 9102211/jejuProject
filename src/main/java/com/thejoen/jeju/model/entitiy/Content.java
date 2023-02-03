package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Content {

    @Id
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
}
