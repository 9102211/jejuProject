package com.thejoen.jeju.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.thejoen.jeju.model.entitiy.QForeignVisitorData;
import com.thejoen.jeju.model.network.dto.request.ForeignVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ForeignVisitorDataResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ForeignVisitorDataRepositoryImpl implements ForeignVisitorRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    private QForeignVisitorData foreignVisitorData = QForeignVisitorData.foreignVisitorData;

    @Override
    public List<ForeignVisitorDataResponseDTO> search(ForeignVisitorDataRequestDTO request) {
        return queryFactory
                .select(Projections.constructor(ForeignVisitorDataResponseDTO.class,
                        foreignVisitorData.month, foreignVisitorData.japan,
                        foreignVisitorData.china, foreignVisitorData.hongkong,
                        foreignVisitorData.taiwan, foreignVisitorData.singapore,
                        foreignVisitorData.malaysia, foreignVisitorData.indonesia,
                        foreignVisitorData.vietnam, foreignVisitorData.usa,
                        foreignVisitorData.misc, foreignVisitorData.sum
                ))
                .from(foreignVisitorData)
                .where(
                        foreignVisitorData.month.year().eq(request.getYear())
                )
                .orderBy(foreignVisitorData.month.asc())
                .fetch();
    }

}
