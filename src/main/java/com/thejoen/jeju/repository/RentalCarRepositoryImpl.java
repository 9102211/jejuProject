package com.thejoen.jeju.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QRentalCar;
import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RentalCarRepositoryImpl implements RentalCarRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private QRentalCar rentalCar = QRentalCar.rentalCar;

    @Override
    public Page<RentalCarResponseDTO> search(RentalCarSearchRequestDTO request, Pageable pageable) {
        List<OrderSpecifier> ORDERS = getOrderSpecifier(pageable.getSort());

        List<RentalCarResponseDTO> content = queryFactory
                .select(Projections.constructor(RentalCarResponseDTO.class,
                        rentalCar.id, rentalCar.name,
                        rentalCar.address, rentalCar.tel,
                        rentalCar.lat, rentalCar.lon
                        ))
                .from(rentalCar)
                .where(
                        hasEV(request.hasEV()),
                        hasVan(request.hasVan())
                )
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPQLQuery<RentalCar> countQuery = queryFactory
                .selectFrom(rentalCar)
                .where(
                        hasEV(request.hasEV()),
                        hasVan(request.hasVan())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression hasEV(Boolean hasEV) {
        return hasEV != null && hasEV ? rentalCar.numberOfElectricVehicles.gt(0) : null;
    }

    private BooleanExpression hasVan(Boolean hasVan) {
        return hasVan != null && hasVan? rentalCar.numberOfVans.gt(0) : null;
    }

    private List<OrderSpecifier> getOrderSpecifier(Sort sort) {

        List<OrderSpecifier> orders = new ArrayList<>();

        if(!sort.isEmpty()) {
            for (Sort.Order order : sort) {

                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "score" :
                        orders.add(new OrderSpecifier(direction, rentalCar.score));
                        break;
                    case "numberOfTotalVehicles" :
                        orders.add(new OrderSpecifier(direction, rentalCar.numberOfTotalVehicles));
                        break;
                }
            }
        }

        orders.add(new OrderSpecifier(Order.ASC, rentalCar.name));

        return orders;
    }
}
