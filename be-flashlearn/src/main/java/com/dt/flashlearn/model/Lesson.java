package com.dt.flashlearn.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Lesson {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Course course;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private List<VocabularyOfLesson> vocabularies;
}