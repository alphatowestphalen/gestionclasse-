package com.alphato.west.gestion_salle.entity;

public enum Genre {
    FEMININ('F'),
    MASCULIN('M');

    private char code;
    Genre(char code) {
        this.code = code;
    }
    public static Genre fromCode(char code) {
        if(code =='F' || code =='f') return Genre.FEMININ;
        else if(code =='M' || code =='m') return Genre.MASCULIN;
        throw new UnsupportedOperationException("Unknown "+ code +" Genre");
    }

    public char getCode() {
        return code;
    }

}
