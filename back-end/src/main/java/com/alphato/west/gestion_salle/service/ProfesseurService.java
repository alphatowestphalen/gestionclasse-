package com.alphato.west.gestion_salle.service;

import com.alphato.west.gestion_salle.entity.Genre;
import com.alphato.west.gestion_salle.entity.Professeur;
import com.alphato.west.gestion_salle.repository.ProfesseurRepository;

import java.util.List;

public class ProfesseurService {
    private final ProfesseurRepository repository;

    public ProfesseurService(){
        repository = new ProfesseurRepository();
    }

    public List<Professeur> getAllProfesseurs(){
        return repository.findAll().stream().toList();
    }
    public Professeur find(Long codeProf){
        return  repository.read(codeProf);
    }
    public Professeur update(Professeur professeur){
        GradeService service = new GradeService();
        professeur.setGrade(service.find(professeur.getGrade().getCodeGrade()));
        return repository.update(professeur);
    }
    public Professeur save(Professeur professeur){
        GradeService service = new GradeService();
        professeur.setGrade(service.find(professeur.getGrade().getCodeGrade()));
        return repository.create(professeur);
//        return professeur;
    }
    public boolean delete(Long codeProf) {
        return repository.delete(codeProf);
    }
    public List<Professeur> getProfeByGender(Genre genre){
        return repository.byGenre(genre).stream().toList();
    }
    public List<Professeur> getProfByName(String name){
        return repository.nameLike(name).stream().toList();
    }

}
