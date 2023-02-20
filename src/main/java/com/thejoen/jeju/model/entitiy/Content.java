package com.thejoen.jeju.model.entitiy;

import com.thejoen.jeju.model.enumclass.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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

    private String homepage;

    private String openTime;

    private Double naverScore;

    private Double kakaoScore;

    private Double googleScore;

    private Long countOfReview;

    @Enumerated(EnumType.STRING)
    private CategoryType category;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "content")
    private List<Review> reviewList;
}
