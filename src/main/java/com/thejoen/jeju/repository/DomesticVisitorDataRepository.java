package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface DomesticVisitorDataRepository extends JpaRepository<DomesticVisitorData, LocalDate>, DomesticVisitorRepositoryCustom {

    @Query(value = "select max(month) from domestic_visitor_data", nativeQuery = true)
    Timestamp findMaxMonth();

    @Query(value = "select sum(sum) from domestic_visitor_data where month between :startDate and :endDate", nativeQuery = true)
    Long findCumSumOfVisitor(String startDate, String endDate);
}
