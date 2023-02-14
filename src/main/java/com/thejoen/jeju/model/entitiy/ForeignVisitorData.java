package com.thejoen.jeju.model.entitiy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class ForeignVisitorData {

        @Id
        private LocalDate month;

        private Long japan;

        private Long china;

        private Long hongkong;

        private Long taiwan;

        private Long singapore;

        private Long malaysia;

        private Long indonesia;

        private Long vietnam;

        private Long usa;

        private Long misc;

        private Long sum;
}
