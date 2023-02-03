package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.entitiy.Content;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, String>, ContentRepositoryCustom {


}
