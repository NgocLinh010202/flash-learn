package com.dt.flashlearn.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonInput {
    private Long id;
    @NotBlank
    private String name;
    @Size(max = 1024, message = "Mô tả không quá 1024 kí tự")
    private String description;
    private MultipartFile image;
    @NotNull
    private Long courseId;
}
