package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.service.LessonService;
import com.dt.flashlearn.service.component.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/lesson")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @Autowired
    private ResponseHandler responseHandler;
    
    @GetMapping()
    public ResponseEntity<?> getAllLessonByCourse(@RequestParam(required = true) Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(lessonService.getAllLessonByCourse(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("{lessonId}")
    public ResponseEntity<?> getLessonById(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(lessonService.getLessonById(lessonId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }
    
}
