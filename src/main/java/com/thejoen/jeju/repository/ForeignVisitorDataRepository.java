package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import com.thejoen.jeju.model.entitiy.ForeignVisitorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface ForeignVisitorDataRepository extends JpaRepository<ForeignVisitorData, LocalDate>, ForeignVisitorRepositoryCustom {
    @Query(value = "select sum(sum) from foreign_visitor_data where month between :startDate and :endDate", nativeQuery = true)
    Long findCumSumOfVisitor(String startDate, String endDate);
}
