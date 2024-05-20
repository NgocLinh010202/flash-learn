package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Lesson {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Long totalVocabOfLesson;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
