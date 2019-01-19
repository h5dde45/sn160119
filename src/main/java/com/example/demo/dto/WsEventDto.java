package com.example.demo.dto;

import com.example.demo.domain.Views;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@JsonView(Views.Id.class)
@AllArgsConstructor
public class WsEventDto {
    private ObjectType objectType;
    private EventType eventType;

    @JsonValue
    private String body;
}
