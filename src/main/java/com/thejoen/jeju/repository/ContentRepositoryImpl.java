package com.thejoen.jeju.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.Content;
import com.thejoen.jeju.model.entitiy.QContent;
import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.model.network.dto.request.ContentSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.util.StringUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ContentRepositoryImpl implements ContentRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private QContent content = QContent.content;

    @Override
    public Page<ContentResponseDTO> search(ContentSearchRequestDTO request, Pageable pageable) {
        List<OrderSpecifier> ORDERS = getOrderSpecifier(pageable.getSort(), request.getKeyword());

        List<ContentResponseDTO> contents = queryFactory
                .select(Projections.constructor(ContentResponseDTO.class,
                        content.id, content.title,
                        content.address, content.description,
                        content.lat, content.lon,
                        content.tel, content.image,
                        content.tag, content.homepage,
                        content.openTime, content.naverScore,
                        content.kakaoScore, content.googleScore,
                        content.category
                        ))
                .from(content)
                .where(
                        content.category.eq(request.getCategory()),
                        titleOrDescOrTagContains(request.getKeyword())
                )
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPQLQuery<Content> countQuery = queryFactory
                .selectFrom(content)
                .where(
                        content.category.eq(request.getCategory()),
                        titleOrDescOrTagContains(request.getKeyword())
                );
        return PageableExecutionUtils.getPage(contents, pageable, countQuery::fetchCount);
    }

    private List<OrderSpecifier> getOrderSpecifier(Sort sort, String keyword) {

        List<OrderSpecifier> orders = new ArrayList<>();

        if(!sort.isEmpty()) {
            for (Sort.Order order : sort) {

                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "search" :
                        Expression<String> pattern = Expressions.stringTemplate("{0}", keyword);
                        orders.add(new OrderSpecifier(direction, Expressions.numberTemplate(Long.class, "regexp_count({0}, {1})", content.title, pattern)));
                        orders.add(new OrderSpecifier(direction, Expressions.numberTemplate(Long.class, "regexp_count({0}, {1})", content.description, pattern)));
                        break;
                    case "naverScore" :
                        orders.add(new OrderSpecifier(direction, content.naverScore));
                        break;
                    case "kakaoScore" :
                        orders.add(new OrderSpecifier(direction, content.kakaoScore));
                        break;
                    case "googleScore" :
                        orders.add(new OrderSpecifier(direction, content.googleScore));
                        break;
                }
            }
        }
        orders.add(new OrderSpecifier(Order.ASC, content.title));

        return orders;

    }

    private BooleanExpression titleOrDescOrTagContains(String keyword) {

        System.out.println(keyword);

        return StringUtils.isNotBlank(keyword) ? content.title.contains(keyword).or(content.description.contains(keyword).or(content.tag.contains(keyword))) : null;

    }
}
