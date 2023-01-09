package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.RoadEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RoadEventRepository extends JpaRepository<RoadEvent, String> {

    @Query("select r from RoadEvent r where r.lastUpdatedAt >= :threshold and r.lastUpdatedAt = (select max(r2.lastUpdatedAt) from RoadEvent r2)")
    List<RoadEvent> findAllMostRecentEvent(LocalDateTime threshold);
}
