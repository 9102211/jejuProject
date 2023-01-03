package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.RentalCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalCarRepository extends JpaRepository<RentalCar, Long>, RentalCarRepositoryCustom {

}
