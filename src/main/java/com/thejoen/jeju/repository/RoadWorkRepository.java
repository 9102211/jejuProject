package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.RoadClose;
import com.thejoen.jeju.model.entitiy.RoadWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RoadWorkRepository extends JpaRepository<RoadWork, String> {

    @Query("select r from RoadWork r where r.lastUpdatedAt >= :threshold and r.lastUpdatedAt = (select max(r2.lastUpdatedAt) from RoadWork r2)")
    List<RoadWork> findAllMostRecentWork(LocalDateTime threshold);
}
