package com.thejoen.jeju.repository;


import com.thejoen.jeju.model.entitiy.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {
}
