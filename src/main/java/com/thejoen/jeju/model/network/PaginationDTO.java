package com.thejoen.jeju.model.network;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PaginationDTO<T> {

    private List<T> data;

    private Pagination pagination;

    public PaginationDTO (Page<T> page) {
        this.data = page.getContent();
        this.pagination = Pagination.builder()
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .currentPage(page.getNumber())
                .currentElements(page.getNumberOfElements())
                .build();;
    }
}
