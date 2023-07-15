package com.alphato.west.gestion_salle.repository;

import com.alphato.west.gestion_salle.entity.Grade;
import com.alphato.west.gestion_salle.repository.exeption.NotFoundException;
import com.alphato.west.gestion_salle.sessionFactory.MySessionFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class GradeRepository implements InterfaceCRUD<Grade> {
    Session session;

    public GradeRepository() {
        session = MySessionFactory.getSessionFactory().openSession();
    }

    @Override
    public Grade create(Grade grade) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        session.persist(grade);
        transaction.commit();
        session.close();
        return grade;
    }

    @Override
    public Grade read(Long idThing) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Grade> gradeOptional = session.byId(Grade.class).loadOptional(idThing);
        transaction.commit();
        session.close();
        if(gradeOptional.isPresent()) return gradeOptional.get();
        throw new NotFoundException("Not found grade having id " + idThing);
    }

    @Override
    public Grade update(Grade grade) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Grade gradeDB = session.find(Grade.class, grade.getCodeGrade());
        gradeDB.setDesignation(grade.getDesignation());
        session.flush();
        transaction.commit();
        session.close();
        return grade;
    }

    @Override
    public boolean delete(Long idGrade) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Grade> gradeOptional = session.byId(Grade.class).loadOptional(idGrade);
        if(gradeOptional.isEmpty()) throw new NotFoundException("Not found grade having id " + idGrade);
        session.remove(gradeOptional.get());
        transaction.commit();
        return true;
    }

    public Collection<Grade>designationLike(String designation){
        String query = "from Grade as g where g.designation like :designation ";

        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Grade> gradeCollection =  session.createQuery(query,Grade.class)
                        .setParameter("designation","%"+designation+"%")
                        .getResultList();
        transaction.commit();
        session.close();
        return gradeCollection;
    }


    public List<Grade> findAll() {
        String query = "from Grade g order by g.createdAt desc ";

        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Grade> gradeCollection =  session.createQuery(query,Grade.class)
                .getResultList();
        transaction.commit();
        session.close();
        return gradeCollection.stream().toList();
    }
}
