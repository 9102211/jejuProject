package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.GasStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GasStationRepository extends JpaRepository<GasStation, String> {

    List<GasStation> findAll();
}
