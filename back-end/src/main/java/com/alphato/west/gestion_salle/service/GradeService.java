package com.alphato.west.gestion_salle.service;

import com.alphato.west.gestion_salle.entity.Grade;
import com.alphato.west.gestion_salle.repository.GradeRepository;

import java.util.Collection;
import java.util.List;

public class GradeService {
    private final GradeRepository gradeRepository;

    public GradeService() {
        this.gradeRepository = new GradeRepository();
    }

    public Grade find(Long id){
        return gradeRepository.read(id);
    }
    public Grade save(Grade grade){
        return gradeRepository.create(grade);
    }

    public Grade update(Grade grade){
        return gradeRepository.update(grade);
    }
    public boolean remove(Long id){
        return gradeRepository.delete(id);
    }

    public Collection<Grade> getGradeLikeDesignation(String patherne){
        return gradeRepository.designationLike(patherne);
    }

    public List<Grade> findAll() {
        return gradeRepository.findAll();
    }
}
