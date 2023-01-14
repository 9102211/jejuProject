package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.RoadCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RoadConditionRepository extends JpaRepository<RoadCondition, Long> {

    @Query("select r from RoadCondition r where r.createdAt >= :threshold and r.createdAt = (select max(r2.createdAt) from RoadCondition r2)")
    List<RoadCondition> findAllMostRecentCondition(LocalDateTime threshold);
}
