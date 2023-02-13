package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;

import java.util.List;

public interface DomesticVisitorRepositoryCustom {
    List<DomesticVisitorDataResponseDTO> search(DomesticVisitorDataRequestDTO request);
}
