package com.alphato.west.gestion_salle.service;

import com.alphato.west.gestion_salle.entity.Salle;
import com.alphato.west.gestion_salle.repository.SalleRepository;

import java.util.List;

public class SalleService {
    private final SalleRepository repository;

    public SalleService(){
        repository = new SalleRepository();
    }

    public List<Salle> getAllSalle(){
        return repository.findAll().stream().toList();
    }
    public Salle find(Long codeProf){
        return  repository.read(codeProf);
    }
    public Salle update(Salle salle){
        return repository.update(salle);
    }
    public Salle save(Salle salle){
        return repository.create(salle);
    }
    public boolean delete(Long codeProf) {
        return repository.delete(codeProf);
    }
    public List<Salle> getSalleLike(String name){
        return repository.salleLike(name).stream().toList();
    }

}
