package com.thejoen.jeju.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QRentalCar;
import com.thejoen.jeju.model.entitiy.QReview;
import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.model.entitiy.Review;
import com.thejoen.jeju.model.network.dto.request.ReviewSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
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
//        List<OrderSpecifier> ORDERS = getOrderSpecifier(pageable.getSort());

        List<ReviewResponseDTO> content = queryFactory
                .select(Projections.constructor(ReviewResponseDTO.class,
                        review.id,
                        review.writer, review.content,
                        review.type, review.score,
                        review.createdAt
                ))
                .from(review)
//                .where(
//                )
//                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPQLQuery<Review> countQuery = queryFactory
                .selectFrom(review);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }
}
