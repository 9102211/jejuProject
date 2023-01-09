package com.thejoen.jeju.repository;


import com.thejoen.jeju.model.entitiy.RoadClose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RoadCloseRepository extends JpaRepository<RoadClose, String> {

    @Query("select r from RoadClose r where r.lastUpdatedAt >= :threshold and r.lastUpdatedAt = (select max(r2.lastUpdatedAt) from RoadClose r2)")
    List<RoadClose> findAllMostRecentEvent(LocalDateTime threshold);

}
