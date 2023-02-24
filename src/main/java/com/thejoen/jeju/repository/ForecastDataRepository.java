package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.ForecastData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ForecastDataRepository extends JpaRepository<ForecastData, LocalDate> {

    @Query(value = "select * from forecast_data where MONTHS_BETWEEN((select max(month) from forecast_data), month) < 10", nativeQuery = true)
    List<ForecastData> findLastTen();

}
