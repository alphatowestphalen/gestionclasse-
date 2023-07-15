package com.alphato.west.gestion_salle.util;

import com.alphato.west.gestion_salle.entity.Genre;
import jakarta.persistence.AttributeConverter;

public class GenreConverter implements AttributeConverter<Genre, Character> {

    @Override
    public Character convertToDatabaseColumn(Genre attribute) {
        if (attribute == null) return null;
        if(attribute.getCode() == Genre.FEMININ.getCode()) return Genre.FEMININ.getCode();
        return Genre.MASCULIN.getCode();
    }

    @Override
    public Genre convertToEntityAttribute(Character dbData) {
        if (dbData == null) return null;
        return Genre.fromCode(dbData);
    }
}
