package com.thejoen.jeju.repository;

import com.thejoen.jeju.model.network.dto.request.DomesticVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.request.ForeignVisitorDataRequestDTO;
import com.thejoen.jeju.model.network.dto.response.DomesticVisitorDataResponseDTO;
import com.thejoen.jeju.model.network.dto.response.ForeignVisitorDataResponseDTO;

import java.util.List;

public interface ForeignVisitorRepositoryCustom {
    List<ForeignVisitorDataResponseDTO> search(ForeignVisitorDataRequestDTO request);
}
