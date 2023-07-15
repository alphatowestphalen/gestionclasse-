package com.alphato.west.gestion_salle.repository;

public interface InterfaceCRUD<T> {
    T create(T thing);
    T read(Long idThing);
    T update(T thing);
    boolean delete(Long idThing);
}
