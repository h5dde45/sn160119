package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@ToString(of = {"id","text"})
@EqualsAndHashCode(of = {"id"})
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Vews.Id.class)
    private Long id;
    @JsonView(Vews.IdName.class)
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING,
            pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(updatable = false)
    @JsonView(Vews.FullMessage.class)
    private LocalDateTime creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}