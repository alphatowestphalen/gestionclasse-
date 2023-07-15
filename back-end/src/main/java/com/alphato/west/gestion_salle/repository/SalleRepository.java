package com.alphato.west.gestion_salle.repository;

import com.alphato.west.gestion_salle.entity.Salle;
import com.alphato.west.gestion_salle.repository.exeption.NotFoundException;
import com.alphato.west.gestion_salle.sessionFactory.MySessionFactory;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.Collection;
import java.util.Optional;

public class SalleRepository implements InterfaceCRUD<Salle> {

    Session session;

    public SalleRepository() {
        this.session = MySessionFactory.getSessionFactory().openSession();
    }

    @Override
    public Salle create(Salle salle) {
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        session.persist(salle);
        transaction.commit();
        session.close();
        return salle;
    }

    @Override
    public Salle read(Long codeSalle) {
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Salle> salleOpt =  session.byId(Salle.class).loadOptional(codeSalle);
        transaction.commit();
        if (salleOpt.isPresent()) return salleOpt.get();
        throw new NotFoundException("Could not find Salle having id " + codeSalle);
    }

    @Override
    public Salle update(Salle salle) {
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Salle salleDB = session.find(Salle.class,salle.getCodeSal());
        salleDB.update(salle);
        session.flush();
        transaction.commit();
        session.close();
        return salle;
    }

    @Override
    public boolean delete(Long codeSalle) {
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Optional<Salle> salleOptional =  session.byId(Salle.class).loadOptional(codeSalle);
        if(salleOptional.isEmpty()) throw new NotFoundException("No Salle has code :" + codeSalle);
        session.remove(salleOptional.get());
        transaction.commit();
        session.close();
        return true;
    }

    public Collection<Salle> findAll(){
        Transaction transaction = session.getTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Salle> salleCollection = session.createQuery("from Salle s order by s.createdAt DESC ",Salle.class).getResultList();
        transaction.commit();
        session.close();
        return salleCollection;
    }

    public Collection<Salle> salleLike(String name) {
        String query = "from Salle s where lower(s.designation)like lower(concat('%' ,:designation,'%' )) order by s.createdAt DESC " ;
        Transaction transaction = session.beginTransaction();
        if(!transaction.isActive()) transaction.begin();
        Collection<Salle> salleCollection =  session
                .createQuery(query, Salle.class)
                .setParameter("designation", name).getResultList();

        transaction.commit();
        session.close();
        return salleCollection;
    }
}
