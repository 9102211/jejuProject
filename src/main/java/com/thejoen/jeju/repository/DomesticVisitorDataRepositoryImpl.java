package com.thejoen.jeju.repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QDomesticVisitorData;
import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class DomesticVisitorDataRepositoryImpl implements DomesticVisitorRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    private QDomesticVisitorData domesticVisitorData = QDomesticVisitorData.domesticVisitorData;
    @Override
    public List<DomesticVisitorDataResponseDTO> search(DomesticVisitorDataRequestDTO request) {
        return queryFactory
                .select(Projections.constructor(DomesticVisitorDataResponseDTO.class,
                        domesticVisitorData.month, domesticVisitorData.independentTour,
                        domesticVisitorData.partialPackageTour, domesticVisitorData.packageTour,
                        domesticVisitorData.leisureSports, domesticVisitorData.business,
                        domesticVisitorData.relaxation, domesticVisitorData.visit,
                        domesticVisitorData.education, domesticVisitorData.misc,
                        domesticVisitorData.sum
                ))
                .from(domesticVisitorData)
                .where(
                    domesticVisitorData.month.between(request.getStartDate(), request.getEndDate())
                )
                .orderBy(domesticVisitorData.month.asc())
                .fetch();
    }

//    private BooleanExpression startDateGoe(LocalDateTime startDate) {
//
//        return null;
//
//    }
//
//    private BooleanExpression endDateLoe(LocalDateTime endDate) {
//
//        return null;
//
//    }
}
