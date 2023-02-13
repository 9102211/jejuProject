package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface DomesticVisitorDataRepository extends JpaRepository<DomesticVisitorData, LocalDate>, DomesticVisitorRepositoryCustom {

}
