package com.thejoen.jeju.controller.api;

import com.thejoen.jeju.model.network.PaginationDTO;
import com.thejoen.jeju.model.network.dto.request.ContentSearchRequestDTO;
import com.thejoen.jeju.model.network.dto.response.ContentResponseDTO;
import com.thejoen.jeju.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/content")
public class ContentApiController {

    private final ContentService contentService;

    @GetMapping("/{id}")
    public ResponseEntity<ContentResponseDTO> read(@PathVariable String id, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

        ResponseEntity<ContentResponseDTO> contentResponseDTOResponseEntity = contentService.read(id);

        if(!contentResponseDTOResponseEntity.getBody().getCategory().equals("렌트카")) {

            // 기존 쿠키에서 항목을 가져옴
            List<String> items = getItemsFromCookie(request);

            // 새로운 항목을 추가
            String newItem = URLEncoder.encode(id, "UTF-8");

            items.add(0, newItem); // 가장 최신 항목으로 추가

            // 쿠키에 저장할 항목 수를 최대 10개로 제한
            if (items.size() > 10) {
                items = new ArrayList<>(items.subList(0, 10)); // 가장 오래된 항목을 삭제
            }

            // 항목을 쿠키에 저장
            saveItemsToCookie(items, response);
        }

        return contentResponseDTOResponseEntity;
    }

    @GetMapping("")
    public ResponseEntity<PaginationDTO<ContentResponseDTO>> search(@ModelAttribute ContentSearchRequestDTO request, @PageableDefault(size = 5) Pageable pageable) {
        return contentService.search(request, pageable);
    }

    private List<String> getItemsFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("history".equals(cookie.getName())) {
                    String value = cookie.getValue();
                    return new ArrayList<>(Arrays.asList(value.split("\\|")));
                }
            }
        }
        return new ArrayList<>();
    }

    private void saveItemsToCookie(List<String> items, HttpServletResponse response) {
        String value = String.join("|", items);
        Cookie cookie = new Cookie("history", value);
        cookie.setPath("/");
        cookie.setMaxAge(60*60*24*14);
        response.addCookie(cookie);
    }

}
