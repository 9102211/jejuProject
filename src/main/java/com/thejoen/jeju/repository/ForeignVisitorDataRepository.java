package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.DomesticVisitorData;
import com.thejoen.jeju.model.entitiy.ForeignVisitorData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface ForeignVisitorDataRepository extends JpaRepository<ForeignVisitorData, LocalDate>, ForeignVisitorRepositoryCustom {

}
