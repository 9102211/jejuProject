package com.thejoen.jeju.controller.api;


import com.thejoen.jeju.model.network.dto.response.NaverBlogItemDTO;
import com.thejoen.jeju.model.network.dto.response.NaverBlogResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/naverBlog")
@PropertySource("classpath:config.yml")
public class NaverBlogApIController {

    @Value("${NAVER_CLIENT_ID}")
    private String clientId;

    @Value("${NAVER_CLIENT_SECRET}")
    private String clientSecret;

    @GetMapping("")
    public List<NaverBlogItemDTO> search(@RequestParam String keyword) throws UnsupportedEncodingException {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String url = "https://openapi.naver.com/v1/search/blog.json?display=2&query=" + keyword;

        ResponseEntity<NaverBlogResponseDTO> response = new RestTemplate().exchange(
                url,
                HttpMethod.GET,
                entity,
                NaverBlogResponseDTO.class
        );
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().getItems();
        }
        return Collections.emptyList();
    }
}
