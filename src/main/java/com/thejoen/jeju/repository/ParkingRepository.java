package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingRepository extends JpaRepository<Parking, String> {
}
