package com.thejoen.jeju.repository;


import com.thejoen.jeju.model.entitiy.EvChargingStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvChargingStationRepository extends JpaRepository<EvChargingStation, String> {

    List<EvChargingStation> findAll();
}
