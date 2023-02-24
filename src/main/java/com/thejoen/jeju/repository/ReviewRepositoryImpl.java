package com.thejoen.jeju.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QReview;
import com.thejoen.jeju.model.entitiy.Review;
import com.thejoen.jeju.model.enumclass.ReviewType;
import com.thejoen.jeju.model.network.dto.request.ReviewSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ReviewResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private QReview review = QReview.review;
    @Override
    public Page<ReviewResponseDTO> search(ReviewSearchRequestDTO request, Pageable pageable) {
        List<ReviewResponseDTO> content = queryFactory
                .select(Projections.constructor(ReviewResponseDTO.class,
                        review.id,
                        review.writer, review.detail,
                        review.type, review.score,
                        review.createdAt
                ))
                .from(review)
                .where(
                        review.content.id.eq(request.getContentId()),
                        typeEq(request.getType())
                )
                .orderBy(review.createdAt.desc().nullsLast())
//                .orderBy(review.detail.length().desc().nullsLast())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPQLQuery<Review> countQuery = queryFactory
                .selectFrom(review)
                .where(
                        review.content.id.eq(request.getContentId()),
                        typeEq(request.getType())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression typeEq(List<ReviewType> type) {
        return type != null ? review.type.in(type) : null;
    }

    private BooleanExpression naver(Boolean naver) {
        return naver != null && naver ? review.type.eq(ReviewType.valueOf("NAVER")) : null;
    }

    private BooleanExpression kakao(Boolean kakao) {
        return kakao != null && kakao? review.type.eq(ReviewType.valueOf("KAKAO")) : null;
    }

    private BooleanExpression google(Boolean google) {
        return google != null && google ? review.type.eq(ReviewType.valueOf("GOOGLE")) : null;
    }
}
