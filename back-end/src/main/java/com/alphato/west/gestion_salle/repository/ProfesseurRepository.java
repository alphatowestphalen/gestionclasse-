package com.alphato.west.gestion_salle.repository;

import com.alphato.west.gestion_salle.entity.Genre;
import com.alphato.west.gestion_salle.entity.Professeur;
import com.alphato.west.gestion_salle.repository.exeption.NotFoundException;
import com.alphato.west.gestion_salle.sessionFactory.MySessionFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.Collection;
import java.util.Optional;

public class ProfesseurRepository implements InterfaceCRUD<Professeur>{
    Session session;

    public ProfesseurRepository() {
        this.session = MySessionFactory.getSessionFactory().openSession();
    }

    @Override
    public Professeur create(Professeur professeur) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        session.persist(professeur);
        transaction.commit();
        session.close();
        return professeur;
    }

    @Override
    public Professeur read(Long codeProfesseur) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Professeur> professeurOpt =  session.byId(Professeur.class).loadOptional(codeProfesseur);
        transaction.commit();
        session.close();
        if (professeurOpt.isPresent()) return professeurOpt.get();
        throw new NotFoundException("Could not find professeur having id " + codeProfesseur);
    }

    @Override
    public Professeur update(Professeur professeur) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Professeur prof = session.find(Professeur.class,professeur.getCodeProf());
        prof.update(professeur);
        session.flush();
        transaction.commit();
        session.close();
        return prof;
    }

    @Override
    public boolean delete(Long codeProfesseur) {
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Professeur> professeurOpt =  session.byId(Professeur.class).loadOptional(codeProfesseur);
        if(professeurOpt.isEmpty()) throw new NotFoundException("No professeur has code :" + codeProfesseur);
        session.remove(professeurOpt.get());
        transaction.commit();
        session.close();
        return true;
    }

    public Collection<Professeur> findAll(){
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Professeur> professeurCollection = session.createQuery("from Professeur p order by p.createdAt DESC ",Professeur.class).getResultList();
        transaction.commit();
        session.close();
        return professeurCollection;
    }

    public Collection<Professeur> nameLike(String name) {
        String query = "from Professeur p where lower(name)like lower(concat('%' ,:name,'%' ))order by p.createdAt DESC " ;
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Professeur> professeurCollection =  session
                .createQuery(query, Professeur.class)
                .setParameter("name", name).getResultList();

        transaction.commit();
        session.close();
        return professeurCollection;
    }

    public Collection<Professeur> gradeLike(String gradeName) {
        String query = "select p from Professeur p " +
                "left join fetch p.grade where LOWER(p.grade.designation) like lower(concat('%',:name,'%')) order by p.createdAt DESC" ;
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Professeur> professeurCollection =  session
                .createQuery(query, Professeur.class)
                .setParameter("name", gradeName ).getResultList();

        transaction.commit();
        session.close();
        return professeurCollection;
    }

    public Collection<Professeur> byGenre(Genre genre){
        String query = "from Professeur p where fk(p.genre) = :genre order by p.createdAt DESC" ;
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Professeur> professeurCollection =  session
                .createQuery(query, Professeur.class)
                .setParameter("genre", genre).getResultList();
        transaction.commit();
        session.close();
        return professeurCollection;
    }
}
