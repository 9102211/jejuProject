package com.thejoen.jeju.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QRentalCar;
import com.thejoen.jeju.model.entitiy.RentalCar;
import com.thejoen.jeju.model.network.dto.request.RentalCarSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.RentalCarResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RentalCarRepositoryImpl implements RentalCarRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private QRentalCar rentalCar = QRentalCar.rentalCar;

    @Override
    public Page<RentalCarResponseDTO> search(RentalCarSearchRequestDTO request, Pageable pageable) {
        List<RentalCarResponseDTO> content = queryFactory
                .select(Projections.constructor(RentalCarResponseDTO.class,
                        rentalCar.id, rentalCar.name,
                        rentalCar.address, rentalCar.tel,
                        rentalCar.lat, rentalCar.lon
                        ))
                .from(rentalCar)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPQLQuery<RentalCar> countQuery = queryFactory
                .selectFrom(rentalCar);

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }
}
